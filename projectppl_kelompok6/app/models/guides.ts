import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Guide extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public link: string

  @column()
  public durasi?: string

  @column()
  public deskripsi?: string

  @column()
  public tipe: 'video' | 'faq' | 'infografis'
}