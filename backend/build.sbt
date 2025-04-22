name := """PlayScalaApp"""
organization := "play.scala.app"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "3.3.1"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % Test

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "play.scala.app.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "play.scala.app.binders._"
