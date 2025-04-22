package controllers

import play.api.mvc._
import play.api.libs.json._
import javax.inject._
import models.Payment

@Singleton
class PaymentController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  implicit val paymentFormat: OFormat[Payment] = Json.format[Payment]

  def submitPayment(): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Payment].fold(
      _ => BadRequest(Json.obj("error" -> "Invalid payment data")),
      payment => {
        println(s"Received payment: $payment")
        Ok(Json.obj("status" -> "Payment received"))
      })
  }
}
