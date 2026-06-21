import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db, storage } from '@/firebase'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchRequests = async () => {
    loading.value = true
    error.value = null
    try {
      const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      requests.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (e) {
      console.error('Error fetching requests:', e)
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const submitRequest = async (requestData, files) => {
    loading.value = true
    error.value = null
    try {
      let fileUrls = []
      
      // Upload files if any
      if (files && files.length > 0) {
        for (const file of files) {
          const fileRef = storageRef(storage, `requests/${Date.now()}_${file.name}`)
          await uploadBytes(fileRef, file)
          const url = await getDownloadURL(fileRef)
          fileUrls.push(url)
        }
      }

      // Add document to Firestore
      await addDoc(collection(db, 'requests'), {
        ...requestData,
        fileUrls,
        status: 'pending',
        createdAt: serverTimestamp()
      })
      
      return true
    } catch (e) {
      console.error('Error submitting request:', e)
      error.value = e.message
      return false
    } finally {
      loading.value = false
    }
  }

  const updateRequestStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'requests', id), { status })
      const index = requests.value.findIndex(r => r.id === id)
      if (index !== -1) requests.value[index].status = status
    } catch (e) {
      console.error('Error updating status:', e)
    }
  }

  const seedTestData = async () => {
    loading.value = true
    try {
      const dummyRequests = [
        { name: 'Jean Dupont', email: 'jean.dupont@test.com', phone: '0471234567', brand: 'BMW', model: 'Série 3', year: '2019', service: 'Installation CarPlay', message: 'Bonjour, je voudrais installer le CarPlay sans fil.', status: 'pending' },
        { name: 'Marie Martin', email: 'marie.martin@test.com', phone: '0491234567', brand: 'Audi', model: 'A4', year: '2020', service: 'Caméra de recul', message: 'Est-ce possible de rajouter une caméra HD ?', status: 'pending' },
        { name: 'Thomas Bernard', email: 'thomas.b@test.com', phone: '0481234567', brand: 'Mercedes', model: 'Classe C', year: '2017', service: 'Android Auto', message: 'Je suis intéressé par Android Auto.', status: 'contacted' },
        { name: 'Sophie Leroy', email: 's.leroy@test.com', phone: '0475555555', brand: 'Volkswagen', model: 'Golf 7', year: '2016', service: 'Activation options', message: 'Je veux activer le balayage des aiguilles.', status: 'completed' },
        { name: 'Lucas Petit', email: 'lucas.p@test.com', phone: '0499999999', brand: 'Peugeot', model: '308', year: '2021', service: 'Installation CarPlay', message: 'Prix pour un CarPlay ?', status: 'pending' }
      ]

      for (const req of dummyRequests) {
        await addDoc(collection(db, 'requests'), {
          ...req,
          fileUrls: [],
          createdAt: serverTimestamp()
        })
      }
      
      await fetchRequests() // Refresh the list
      return true
    } catch (e) {
      console.error('Error seeding data:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  return { requests, loading, error, fetchRequests, submitRequest, updateRequestStatus, seedTestData }
})
