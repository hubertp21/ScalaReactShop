package services

import models.Product
import javax.inject._
import scala.collection.mutable

@Singleton
class ProductService {
  private val products = mutable.ListBuffer(
    Product(1, "Laptop", 3000),
    Product(2, "Telefon", 1500)
  )

  def list(): Seq[Product] = products.toSeq

  def get(id: Long): Option[Product] = products.find(_.id == id)

  def create(product: Product): Product = {
    products += product
    product
  }

  def update(id: Long, updated: Product): Boolean = {
    get(id).exists { _ =>
      products.indexWhere(_.id == id) match {
        case i if i >= 0 =>
          products.update(i, updated)
          true
        case _ => false
      }
    }
  }

  def delete(id: Long): Boolean = {
    products.indexWhere(_.id == id) match {
      case i if i >= 0 =>
        products.remove(i)
        true
      case _ => false
    }
  }
}
