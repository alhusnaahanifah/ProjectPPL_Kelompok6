// models/guide.ts - Fixed version
export default class Guides {
  public id: string
  public title?: string
  public link: string
  public durasi?: string
  public deskripsi?: string
  public pertanyaan?: string
  public jawaban?: string

  constructor(data: any) {
    this.id = data._id?.toString() || data.id
    this.title = data.title
    this.link = data.link
    this.durasi = data.durasi
    this.deskripsi = data.deskripsi
    this.pertanyaan = data.pertanyaan
    this.jawaban = data.jawaban
  }

  // Getter untuk menentukan tipe
  get tipe(): 'video' | 'faq' | 'infografis' {
    if (this.pertanyaan && this.jawaban) return 'faq'
    if (this.title && this.durasi) return 'video'
    return 'infografis'
  }

  // Method untuk serialize ke JSON
  serialize() {
    return {
      id: this.id,
      title: this.title,
      link: this.link,
      durasi: this.durasi,
      deskripsi: this.deskripsi,
      pertanyaan: this.pertanyaan,
      jawaban: this.jawaban,
      tipe: this.tipe
    }
  }

  // Static methods untuk fetch data dengan proper error handling
  static async fetchAll() {
    try {
     
      const { getMongoDb } = await import('#start/mongodb')
      const db = getMongoDb()

      // Fetch data from all collections with proper error handling
      const [infographicsResult, videosResult, faqsResult] = await Promise.allSettled([
        db.collection('infografis').find({}).toArray(),
        db.collection('video').find({}).toArray(),
        db.collection('faq').find({}).toArray()
      ])

      // Extract successful results or use empty arrays
      const infographics = infographicsResult.status === 'fulfilled' ? infographicsResult.value : []
      const videos = videosResult.status === 'fulfilled' ? videosResult.value : []
      const faqs = faqsResult.status === 'fulfilled' ? faqsResult.value : []

      const result = {
        infographics: infographics.map(item => {
          try {
            return new Guides(item)
          } catch (err) {
            console.error('Error creating Guides instance for infographic:', err, item)
            return null
          }
        }).filter(Boolean),
        videos: videos.map(item => {
          try {
            return new Guides(item)
          } catch (err) {
            console.error('Error creating Guides instance for video:', err, item)
            return null
          }
        }).filter(Boolean),
        faqs: faqs.map(item => {
          try {
            return new Guides(item)
          } catch (err) {
            console.error('Error creating Guides instance for faq:', err, item)
            return null
          }
        }).filter(Boolean)
      }

      return result
    } catch (error) {
      console.error('❌ Error in fetchAll:', error)
      console.error('Stack trace:', error.stack)
     
      // Return empty arrays instead of throwing
      return {
        infographics: [],
        videos: [],
        faqs: []
      }
    }
  }
}