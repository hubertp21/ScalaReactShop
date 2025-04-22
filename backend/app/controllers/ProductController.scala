package controllers

import play.api.mvc._
import javax.inject._
import play.api.libs.json._
import models.Product
import services.ProductService

@Singleton
class ProductController @Inject()(cc: ControllerComponents, productService: ProductService) extends AbstractController(cc) {

  implicit val productFormat: OFormat[Product] = Json.format[Product]

  def list() = Action {
    Ok(Json.toJson(productService.list()))
  }

  def get(id: Long): Action[AnyContent] = Action {
    productService.get(id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def create(): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid JSON")),
      product => Ok(Json.toJson(productService.create(product)))
    )
  }

  def update(id: Long): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product].fold(
      errors => BadRequest(Json.obj("error" -> "Invalid JSON")),
      product =>
        if (productService.update(id, product))
          Ok(Json.obj("status" -> "updated"))
        else
          NotFound(Json.obj("error" -> "Product not found"))
    )
  }

  def delete(id: Long): Action[AnyContent] = Action {
    if (productService.delete(id))
      Ok(Json.obj("status" -> "deleted"))
    else
      NotFound(Json.obj("error" -> "Product not found"))
  }
}
