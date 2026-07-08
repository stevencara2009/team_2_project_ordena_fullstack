CREATE DATABASE  IF NOT EXISTS `ordena` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ordena`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ordena
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '0520b663-bc3e-11f0-a3f4-3f3343b8d2f3:1-571';

--
-- Table structure for table `tbl_bills`
--

DROP TABLE IF EXISTS `tbl_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `client_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `tbl_bills_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_orders` (`id`),
  CONSTRAINT `tbl_bills_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`),
  CONSTRAINT `tbl_bills_ibfk_3` FOREIGN KEY (`client_id`) REFERENCES `tbl_clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bills`
--

LOCK TABLES `tbl_bills` WRITE;
/*!40000 ALTER TABLE `tbl_bills` DISABLE KEYS */;
INSERT INTO `tbl_bills` VALUES (8,'2026-06-29 02:34:24',44000.00,330,65,1);
/*!40000 ALTER TABLE `tbl_bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_clients`
--

DROP TABLE IF EXISTS `tbl_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `nationality` varchar(30) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` text,
  `dni` varchar(30) NOT NULL,
  `typeDocument` enum('CEDULA DE CIUDADANIA','CEDULA DE EXTRANJERIA','PASAPORTE','NIT','TARJETA DE IDENTIDAD') DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_clients`
--

LOCK TABLES `tbl_clients` WRITE;
/*!40000 ALTER TABLE `tbl_clients` DISABLE KEYS */;
INSERT INTO `tbl_clients` VALUES (1,'Juan','Pérez','juan.perez@gmail.com','$2b$10$clienthash01','3001111001','Colombiana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/21.jpg','',NULL,1,NULL),(3,'Jota Mario','Mendoza','carlos.ramirez@gmail.com','$2b$10$clienthash03','3001111003','Argentina','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/23.jpg','',NULL,1,NULL),(4,'Ana','Torres','ana.torres@gmail.com','$2b$10$clienthash04','3001111004','Peruana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/24.jpg','',NULL,1,NULL),(5,'Luis','Martínez','luis.martinez@gmail.com','$2b$10$clienthash05','3001111005','Colombiana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/25.jpg','',NULL,1,NULL),(6,'Sofía','Fernández','sofia.fernandez@gmail.com','$2b$10$clienthash06','3001111006','Chilena','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/26.jpg','',NULL,1,NULL),(7,'Diego','Castro','diego.castro@gmail.com','$2b$10$clienthash07','3001111007','Uruguaya','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/27.jpg','',NULL,1,NULL),(8,'Valentina','Morales','valentina.morales@gmail.com','$2b$10$clienthash08','3001111008','Ecuatoriana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/28.jpg','',NULL,1,NULL),(9,'Andrés','Rojas','andres.rojas@gmail.com','$2b$10$clienthash09','3001111009','Venezolana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/29.jpg','',NULL,1,NULL),(10,'Camila','Silva','camila.silva@gmail.com','$2b$10$clienthash10','3001111010','Brasileña','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/30.jpg','',NULL,1,NULL),(11,'Jorge','Navarro','jorge.navarro@gmail.com','$2b$10$clienthash11','3001111011','Colombiana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/31.jpg','',NULL,1,NULL),(12,'Laura','Vargas','laura.vargas@gmail.com','$2b$10$clienthash12','3001111012','Peruana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/32.jpg','',NULL,1,NULL),(13,'Miguel','Herrera','miguel.herrera@gmail.com','$2b$10$clienthash13','3001111013','Mexicana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/33.jpg','',NULL,1,NULL),(14,'Paula','Jiménez','paula.jimenez@gmail.com','$2b$10$clienthash14','3001111014','Colombiana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/34.jpg','',NULL,1,NULL),(15,'Sebastián','Ortega','sebastian.ortega@gmail.com','$2b$10$clienthash15','3001111015','Argentina','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/35.jpg','',NULL,1,NULL),(16,'Daniela','Mendoza','daniela.mendoza@gmail.com','$2b$10$clienthash16','3001111016','Chilena','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/36.jpg','',NULL,1,NULL),(17,'Felipe','Suárez','felipe.suarez@gmail.com','$2b$10$clienthash17','3001111017','Uruguaya','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/37.jpg','',NULL,1,NULL),(18,'Natalia','Peña','natalia.pena@gmail.com','$2b$10$clienthash18','3001111018','Colombiana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/38.jpg','',NULL,1,NULL),(19,'Ricardo','López','ricardo.lopez@gmail.com','$2b$10$clienthash19','3001111019','Ecuatoriana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/men/39.jpg','',NULL,1,NULL),(20,'Gabriela','Castillo','gabriela.castillo@gmail.com','$2b$10$clienthash20','3001111020','Colombiana','2026-05-24 23:43:01','https://randomuser.me/api/portraits/women/40.jpg','',NULL,1,NULL),(21,'Alejandra','Sanchez','a.s@hotmail.com','123456789dvk#','3124568596','americano',NULL,'https://example.com/clients/jorge.jpg','',NULL,1,NULL),(22,'Alejo','Mendoza','a.s@hotmail.com','123456789dvk#','3124568596','americano',NULL,'https://example.com/clients/jorge.jpg','',NULL,1,NULL),(24,'Alejo','Vergel','als@tmail.com','123456789dvk#','3124568596','americano',NULL,'https://example.com/clients/jorge.jpg','5214259632','CEDULA DE EXTRANJERIA',1,'2008-03-31'),(25,'Juan','Aponte','fgh@sadas.com','123456A#','3102535263','Bermuda',NULL,'','123456789','CEDULA DE CIUDADANIA',1,'2008-04-07'),(26,'Alejo','Vergel','als@tmaisal.com','123456789dvk#','3124568596','americano','2026-06-19 01:54:59','https://example.com/clients/jorge.jpg','5214259632','CEDULA DE EXTRANJERIA',1,'2008-03-31'),(27,'Juan José','Ruiz Aponte','fghsa@sadas.com','123456A#','3102535263','Azerbaijan','2026-06-19 01:56:49','','1234567000','CEDULA DE CIUDADANIA',1,'2008-04-07'),(28,'Juan José','Ruiz Aponte','fghsa@sadas.com','123456A#','3102535263','Azerbaijan','2026-06-19 01:56:59','','1234567000','CEDULA DE CIUDADANIA',1,'2008-04-07'),(29,'Alejo','Vergel','als@tmaisal.com','123456789dvk#','3124568596','americano','2026-06-24 20:55:47','https://example.com/clients/jorge.jpg','5214259632','CEDULA DE EXTRANJERIA',1,'2008-03-31');
/*!40000 ALTER TABLE `tbl_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_order_products`
--

DROP TABLE IF EXISTS `tbl_order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_order_products` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `notes` text,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `tbl_order_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_orders` (`id`),
  CONSTRAINT `tbl_order_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `tbl_products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_order_products`
--

LOCK TABLES `tbl_order_products` WRITE;
/*!40000 ALTER TABLE `tbl_order_products` DISABLE KEYS */;
INSERT INTO `tbl_order_products` VALUES (270,6,1,8000.00,NULL),(280,5,26,18000.00,NULL),(287,5,10,18000.00,NULL),(297,52,2,12000.00,NULL),(298,41,1,14900.00,NULL),(299,35,1,25900.00,NULL),(299,52,2,12000.00,NULL),(301,32,10,5000.00,NULL),(302,32,1,5000.00,NULL),(302,52,2,12000.00,NULL),(304,32,1,5000.00,NULL),(306,8,1,22000.00,NULL),(308,41,1,14900.00,NULL),(309,87,1,5000.00,NULL),(310,6,1,8000.00,'Sin sal'),(312,88,2,6000.00,'Fria'),(314,7,2,40000.00,NULL),(315,85,1,9000.00,NULL),(316,52,2,12000.00,NULL),(317,89,5,9000.00,NULL),(318,52,2,12000.00,NULL),(319,100,1,18000.00,NULL),(320,50,1,25000.00,NULL),(321,77,1,28000.00,NULL),(322,93,2,8000.00,NULL),(323,50,1,25000.00,NULL),(324,52,1,12000.00,NULL),(325,84,2,9000.00,NULL),(326,84,2,9000.00,NULL),(327,93,2,8000.00,NULL),(328,94,3,9000.00,NULL),(329,17,1,10000.00,NULL),(330,80,2,22000.00,NULL),(331,52,1,12000.00,NULL),(333,6,2,8000.00,NULL),(334,80,1,22000.00,NULL);
/*!40000 ALTER TABLE `tbl_order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_orders`
--

DROP TABLE IF EXISTS `tbl_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state` enum('PENDIENTE','EN PREPARACION','LISTO','ENTREGADO','FACTURADO') DEFAULT 'PENDIENTE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `table_number` int NOT NULL,
  `client_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `user_id` (`user_id`),
  KEY `tbl_orders_table_number_fk` (`table_number`),
  CONSTRAINT `tbl_orders_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `tbl_clients` (`id`),
  CONSTRAINT `tbl_orders_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`),
  CONSTRAINT `tbl_orders_table_number_fk` FOREIGN KEY (`table_number`) REFERENCES `tbl_tables` (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_orders`
--

LOCK TABLES `tbl_orders` WRITE;
/*!40000 ALTER TABLE `tbl_orders` DISABLE KEYS */;
INSERT INTO `tbl_orders` VALUES (207,'PENDIENTE','2026-05-20 17:30:00',1,3,22),(260,'PENDIENTE','2026-05-20 17:30:00',1,3,22),(261,'PENDIENTE','2026-05-20 18:15:00',4,3,31),(262,'PENDIENTE','2026-06-01 00:00:00',2,4,23),(263,'PENDIENTE','2026-06-01 01:45:00',7,5,22),(264,'PENDIENTE','2026-06-01 01:45:00',7,5,22),(265,'PENDIENTE','2026-05-22 19:00:00',2,4,31),(266,'PENDIENTE','2026-05-22 19:00:00',2,4,31),(270,'PENDIENTE','2026-05-24 17:45:00',8,7,31),(272,'LISTO','2026-05-25 00:50:00',2,1,23),(273,'LISTO','2026-05-25 01:05:00',9,6,31),(274,'LISTO','2026-05-25 01:12:00',5,8,22),(275,'EN PREPARACION','2026-05-25 01:18:00',11,8,23),(276,'EN PREPARACION','2026-05-25 01:22:00',2,9,31),(277,'EN PREPARACION','2026-05-25 01:25:00',7,3,22),(278,'PENDIENTE','2026-05-25 01:32:00',6,9,31),(279,'PENDIENTE','2026-05-25 01:35:00',10,7,23),(280,'PENDIENTE','2026-05-25 01:38:00',1,5,22),(287,'PENDIENTE','2026-05-25 02:25:35',1,5,22),(297,'PENDIENTE','2026-06-26 03:10:48',9,NULL,65),(298,'PENDIENTE','2026-06-26 03:16:14',11,NULL,65),(299,'PENDIENTE','2026-06-26 03:25:26',12,NULL,65),(300,'EN PREPARACION','2026-06-26 03:28:24',16,NULL,65),(301,'EN PREPARACION','2026-06-26 03:32:14',14,NULL,65),(302,'EN PREPARACION','2026-06-26 03:56:07',5,1,65),(303,'EN PREPARACION','2026-06-26 03:59:55',5,1,65),(304,'EN PREPARACION','2026-06-26 04:01:05',5,1,65),(305,'EN PREPARACION','2026-06-26 04:03:08',5,1,65),(306,'EN PREPARACION','2026-06-27 01:32:43',1,1,65),(307,'EN PREPARACION','2026-06-27 01:54:18',2,1,65),(308,'EN PREPARACION','2026-06-27 02:22:12',18,1,65),(309,'EN PREPARACION','2026-06-27 02:35:26',26,1,65),(310,'EN PREPARACION','2026-06-27 03:31:20',24,1,65),(312,'EN PREPARACION','2026-06-27 04:06:34',29,1,65),(314,'EN PREPARACION','2026-06-28 15:26:24',30,1,65),(315,'LISTO','2026-06-28 15:35:19',9,1,65),(316,'EN PREPARACION','2026-06-28 15:35:50',1,1,65),(317,'EN PREPARACION','2026-06-28 15:37:36',6,1,65),(318,'EN PREPARACION','2026-06-28 15:40:08',7,1,65),(319,'EN PREPARACION','2026-06-28 15:51:51',4,1,65),(320,'EN PREPARACION','2026-06-28 15:54:16',12,1,65),(321,'EN PREPARACION','2026-06-28 15:56:08',11,1,65),(322,'EN PREPARACION','2026-06-28 15:57:15',26,1,65),(323,'LISTO','2026-06-28 15:58:46',16,1,65),(324,'PENDIENTE','2026-06-28 16:03:22',15,1,65),(325,'EN PREPARACION','2026-06-28 16:07:10',3,1,65),(326,'PENDIENTE','2026-06-28 16:12:11',24,1,65),(327,'PENDIENTE','2026-06-28 16:16:52',19,1,65),(328,'PENDIENTE','2026-06-28 16:18:40',27,1,65),(329,'PENDIENTE','2026-06-28 16:34:24',2,1,65),(330,'PENDIENTE','2026-06-28 16:40:04',29,1,65),(331,'PENDIENTE','2026-06-28 16:42:03',30,1,65),(333,'PENDIENTE','2026-06-28 19:35:59',5,1,65),(334,'ENTREGADO','2026-06-29 13:42:30',4,1,65);
/*!40000 ALTER TABLE `tbl_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_products`
--

DROP TABLE IF EXISTS `tbl_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `availability` tinyint(1) DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `image` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_products`
--

LOCK TABLES `tbl_products` WRITE;
/*!40000 ALTER TABLE `tbl_products` DISABLE KEYS */;
INSERT INTO `tbl_products` VALUES (5,'Sancocho de Pescado','Sopas',1,7000.00,'https://example.com/images/tamal.jpg','2026-01-25 22:45:33',NULL),(6,'Arepa de Huevo','Entradas',1,9999.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782750575/ordena/products/lgym5l09dmas0w0tie0r.jpg','2026-01-25 22:45:33',NULL),(7,'Empanadas Colombianas','Entradas',1,30000.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782750316/ordena/products/bvi0vrbsntjtcfvmjyvi.jpg','2026-01-25 22:45:33',NULL),(8,'Mondongo','Sopas',1,37000.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782753181/ordena/products/r35ojakilo9qcxdvpstv.jpg','2026-01-25 22:45:33',NULL),(9,'Carne en Bistec','Plato fuerte',1,23000.00,'https://example.com/images/carne-bistec.jpg','2026-01-25 22:45:33',NULL),(10,'Arroz con Pollo','Saludable',1,25000.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782754885/ordena/products/drnqqbtjozpws172ktdz.jpg','2026-01-25 22:45:33',NULL),(11,'Changua','Sopas',0,15000.00,'https://example.com/images/changua.jpg','2026-01-25 22:45:33',NULL),(17,'Picada Compuesta','Entradas',1,10000.00,'https://example.com/images/picada-compuesta.jpg','2026-01-25 23:06:39',NULL),(32,'Jugo de Fresa','Bebidas',1,5000.00,'https://example.com/images/picada-compuesta.jpg','2026-02-27 00:47:25',NULL),(33,'Picada Sencilla','Entradas',1,10000.00,'https://example.com/images/picada-compuesta.jpg','2026-06-08 01:57:04',NULL),(34,'Picada Sencilla','Entradas',1,20000.00,'https://example.com/images/picada-compuesta.jpg','2026-06-08 01:59:00',NULL),(35,'Hamburguesa doble bacon','Hamburguesas',1,25900.00,'https://example.com/images/picada-compuesta.jpg','2026-06-08 02:08:35',NULL),(41,'Hamburguesa triple','Hamburguesas',1,14900.00,'https://example.com/images/picada-compuesta.jpg','2026-06-08 03:01:00','sadas'),(50,'Atun a la naranja','Japonesa',1,25000.00,'https://example.com/images/picada-compuesta.jpg','2026-06-08 19:09:32','comida de mar'),(52,'Tacos','Mexicana',1,12000.00,'','2026-06-08 19:29:22','dasdasf'),(53,'Hamburguesa Whopper','Hamburguesas',1,15000.00,'https://example.com/images/whopper.jpg','2026-06-24 01:34:21',''),(54,'Bandeja Paisa','Plato Fuerte',1,42000.00,'bandeja-paisa.jpg','2026-06-27 01:10:29','Plato típico con frijoles, arroz, carne, chicharrón, huevo, aguacate y arepa.'),(55,'Ajiaco Santafereño','Sopas',1,11998.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782760504/ordena/products/x8tbv0igfh1xreb19svn.jpg','2026-06-27 01:10:29','Sopa tradicional con pollo, papa criolla, mazorca y alcaparras.'),(56,'Sancocho de Gallina','Plato Fuerte',1,34000.00,'sancocho.jpg','2026-06-27 01:10:29','Caldo tradicional con gallina, yuca, papa y plátano.'),(57,'Lechona Tolimense','Plato Fuerte',1,30000.00,'lechona.jpg','2026-06-27 01:10:29','Cerdo relleno de arroz y arveja.'),(58,'Sobrebarriga en Salsa','Plato Fuerte',1,36000.00,'sobrebarriga.jpg','2026-06-27 01:10:29','Sobrebarriga cocinada lentamente en salsa criolla.'),(59,'Mojarra Frita','Plato Fuerte',1,38000.00,'mojarra.jpg','2026-06-27 01:10:29','Mojarra frita acompañada de arroz con coco y patacón.'),(60,'Trucha al Ajillo','Plato Fuerte',1,39000.00,'trucha-ajillo.jpg','2026-06-27 01:10:29','Trucha bañada en salsa de ajo con papas.'),(61,'Carne Asada','Plato Fuerte',1,35000.00,'carne-asada.jpg','2026-06-27 01:10:29','Carne de res a la parrilla con papas y ensalada.'),(62,'Pollo a la Plancha','Plato Fuerte',1,29000.00,'pollo-plancha.jpg','2026-06-27 01:10:29','Pechuga de pollo con arroz y ensalada.'),(63,'Chuleta Valluna','Plato Fuerte',1,36000.00,'chuleta-valluna.jpg','2026-06-27 01:10:29','Chuleta de cerdo apanada con papas francesas.'),(64,'Mondongo','Sopas',1,28000.00,'mondongo.jpg','2026-06-27 01:10:29','Sopa tradicional con callo, papa y verduras.'),(65,'Mute Santandereano','Sopas',1,30000.00,'mute.jpg','2026-06-27 01:10:29','Sopa espesa con carnes, maíz y verduras.'),(66,'Caldo de Costilla','Sopas',1,22000.00,'caldo-costilla.jpg','2026-06-27 01:10:29','Caldo de costilla de res con papa y cilantro.'),(67,'Crema de Champiñones','Sopas',1,18000.00,'crema-champinones.jpg','2026-06-27 01:10:29','Suave crema de champiñones frescos.'),(68,'Sopa de Verduras','Sopas',1,17000.00,'sopa-verduras.jpg','2026-06-27 01:10:29','Sopa casera de verduras frescas.'),(69,'Empanadas Colombianas','Entradas',1,12000.00,'empanadas.jpg','2026-06-27 01:10:29','Empanadas de carne con ají.'),(70,'Arepa con Queso','Entradas',1,9000.00,'arepa-queso.jpg','2026-06-27 01:10:29','Arepa asada con queso campesino.'),(71,'Patacones con Hogao','Entradas',1,13000.00,'patacones.jpg','2026-06-27 01:10:29','Patacones crujientes con hogao.'),(72,'Papa Rellena','Entradas',1,10000.00,'papa-rellena.jpg','2026-06-27 01:10:29','Papa rellena de carne y arroz.'),(73,'Chorizo con Arepa','Entradas',1,15000.00,'chorizo-arepa.jpg','2026-06-27 01:10:29','Chorizo artesanal acompañado de arepa.'),(74,'Hamburguesa Especial','Comida Rápida',1,26000.00,'hamburguesa.jpg','2026-06-27 01:10:29','Hamburguesa de carne con queso y tocineta.'),(75,'Perro Caliente','Comida Rápida',1,18000.00,'perro.jpg','2026-06-27 01:10:29','Perro caliente con papas chips y salsas.'),(76,'Salchipapa','Comida Rápida',1,22000.00,'salchipapa.jpg','2026-06-27 01:10:29','Papas francesas con salchicha y salsas.'),(77,'Mazorcada','Comida Rápida',1,28000.00,'mazorcada.jpg','2026-06-27 01:10:29','Mazorca desgranada con carnes y queso.'),(78,'Picada Colombiana','Comida Rápida',1,45000.00,'picada.jpg','2026-06-27 01:10:29','Variedad de carnes, papa y arepa.'),(79,'Ensalada César','Ensaladas',1,21000.00,'cesar.jpg','2026-06-27 01:10:29','Lechuga, pollo, queso parmesano y aderezo César.'),(80,'Ensalada Tropical','Ensaladas',1,22000.00,'tropical.jpg','2026-06-27 01:10:29','Frutas frescas con vegetales y vinagreta.'),(81,'Ensalada de Atún','Ensaladas',1,23000.00,'atun.jpg','2026-06-27 01:10:29','Atún con vegetales frescos.'),(82,'Limonada Natural','Bebidas',1,8000.00,'limonada.jpg','2026-06-27 01:10:29','Limonada preparada con limón fresco.'),(83,'Limonada de Coco','Bebidas',1,12000.00,'limonada-coco.jpg','2026-06-27 01:10:29','Limonada cremosa con coco.'),(84,'Jugo de Mango','Bebidas',1,9000.00,'jugo-mango.jpg','2026-06-27 01:10:29','Jugo natural de mango.'),(85,'Jugo de Mora','Bebidas',1,9000.00,'jugo-mora.jpg','2026-06-27 01:10:29','Jugo natural de mora.'),(86,'Jugo de Lulo','Bebidas',1,9000.00,'jugo-lulo.jpg','2026-06-27 01:10:29','Jugo natural de lulo.'),(87,'Agua Mineral','Bebidas',1,5000.00,'agua.jpg','2026-06-27 01:10:29','Agua mineral sin gas.'),(88,'Gaseosa Personal','Bebidas',1,6000.00,'gaseosa.jpg','2026-06-27 01:10:29','Bebida gaseosa de 400 ml.'),(89,'Cerveza Nacional','Bebidas',1,9000.00,'cerveza.jpg','2026-06-27 01:10:29','Cerveza nacional bien fría.'),(90,'Café Tinto','Bebidas',1,5000.00,'tinto.jpg','2026-06-27 01:10:29','Café colombiano recién preparado.'),(91,'Chocolate Caliente','Bebidas',1,7000.00,'chocolate.jpg','2026-06-27 01:10:29','Chocolate caliente tradicional.'),(92,'Tres Leches','Postres',1,12000.00,'tres-leches.jpg','2026-06-27 01:10:29','Bizcocho bañado en tres leches.'),(93,'Arroz con Leche','Postres',1,8000.00,'arroz-leche.jpg','2026-06-27 01:10:29','Postre tradicional colombiano.'),(94,'Flan de Caramelo','Postres',1,9000.00,'flan.jpg','2026-06-27 01:10:29','Flan casero con caramelo.'),(95,'Brevas con Arequipe','Postres',1,11000.00,'brevas.jpg','2026-06-27 01:10:29','Brevas rellenas de arequipe.'),(96,'Oblea con Arequipe','Postres',1,9000.00,'oblea.jpg','2026-06-27 01:10:29','Oblea tradicional con arequipe.'),(97,'Helado Artesanal','Postres',1,10000.00,'helado.jpg','2026-06-27 01:10:29','Helado artesanal de temporada.'),(98,'Cheesecake de Maracuyá','Postres',1,13000.00,'cheesecake.jpg','2026-06-27 01:10:29','Cheesecake con salsa de maracuyá.'),(99,'Calentado Paisa','Desayuno',1,24000.00,'calentado.jpg','2026-06-27 01:10:29','Calentado con huevo y arepa.'),(100,'Huevos Pericos','Desayuno',1,18000.00,'pericos.jpg','2026-06-27 01:10:29','Huevos revueltos con tomate y cebolla.'),(101,'Tamal Colombiano','Desayuno',1,20000.00,'tamal.jpg','2026-06-27 01:10:29','Tamal tradicional con chocolate caliente.'),(102,'Arroz Blanco','Acompañamiento',1,5000.00,'arroz.jpg','2026-06-27 01:10:29','Porción de arroz blanco.'),(103,'Papas Francesas','Acompañamiento',1,7000.00,'papas.jpg','2026-06-27 01:10:29','Papas fritas crocantes.'),(104,'Patacón','Acompañamiento',1,6000.00,'patacon.jpg','2026-06-27 01:10:29','Patacón grande y crujiente.'),(105,'Yuca Frita','Acompañamiento',1,7000.00,'yuca.jpg','2026-06-27 01:10:29','Yuca frita dorada.'),(106,'Aguacate','Acompañamiento',1,6000.00,'aguacate.jpg','2026-06-27 01:10:29','Porción de aguacate fresco.'),(107,'Pasta Bolognesa','Pastas',1,20999.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782747514/ordena/products/wkolsqp4sfouycosn9mj.jpg','2026-06-29 15:40:19',''),(108,'Pasta pesto','Pastas',1,22000.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782748821/ordena/products/fejb6qmpktxyszcciwg2.jpg','2026-06-29 16:00:27','Pasta de origen siciliano'),(109,'Limonada de mango','Bebidas',1,12000.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782754572/ordena/products/zadu5b0le2wcs2petbwz.png','2026-06-29 17:36:19','Bebida singular'),(110,'Asado con vacío','Carnes',1,28000.00,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782760441/ordena/products/yazvhdiy7fxp67czhv0b.png','2026-06-29 19:14:15','');
/*!40000 ALTER TABLE `tbl_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tables`
--

DROP TABLE IF EXISTS `tbl_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `capacity` int NOT NULL,
  `state` enum('LIBRE','OCUPADA','RESERVADA') DEFAULT 'LIBRE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tables`
--

LOCK TABLES `tbl_tables` WRITE;
/*!40000 ALTER TABLE `tbl_tables` DISABLE KEYS */;
INSERT INTO `tbl_tables` VALUES (1,1,2,'OCUPADA'),(3,2,4,'LIBRE'),(4,4,4,'OCUPADA'),(5,5,6,'OCUPADA'),(6,6,2,'LIBRE'),(7,7,4,'LIBRE'),(8,8,8,'RESERVADA'),(9,9,2,'LIBRE'),(10,10,6,'LIBRE'),(11,11,4,'LIBRE'),(12,12,2,'LIBRE'),(13,13,8,'RESERVADA'),(14,14,6,'LIBRE'),(15,15,4,'LIBRE'),(16,16,2,'LIBRE'),(17,17,10,'RESERVADA'),(18,18,6,'LIBRE'),(19,19,4,'LIBRE'),(26,24,5,'OCUPADA'),(29,26,5,'OCUPADA'),(34,3,4,'LIBRE'),(38,27,4,'LIBRE'),(39,28,8,'OCUPADA'),(40,29,5,'OCUPADA'),(41,30,4,'LIBRE'),(42,31,7,'LIBRE'),(44,41,19,'OCUPADA'),(45,52,10,'OCUPADA'),(46,55,8,'LIBRE');
/*!40000 ALTER TABLE `tbl_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `role` enum('ADMINISTRADOR','MESERO','COCINERO','CLIENTE') NOT NULL,
  `nationality` varchar(30) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` text,
  `active` tinyint(1) DEFAULT '1',
  `dni` varchar(30) NOT NULL,
  `typeDocument` enum('CEDULA DE CIUDADANIA','CEDULA DE EXTRANJERIA','PASAPORTE','NIT','TARJETA DE IDENTIDAD') DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (22,'Juan','Pérez','juan.perez@gmail.com','$2b$10$hashadmin01','3001112233','ADMINISTRADOR','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/1.jpg',1,'',NULL,NULL),(23,'María','Gómez','maria.gomez@gmail.com','123456S#','3001112234','MESERO','Colombiana','2026-05-24 22:11:23','https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782754085/ordena/users/pe8gh1iqrlpk2gya5rhj.jpg',1,'1234567895',NULL,NULL),(24,'Carlos','Rodríguez','carlos.rodriguez@gmail.com','$2b$10$hashcocinero01','3001112235','COCINERO','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/3.jpg',1,'',NULL,NULL),(25,'Ana','Martínez','ana.martinez@gmail.com','$2b$10$hashcliente01','3001112236','CLIENTE','Mexicana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/4.jpg',1,'',NULL,NULL),(26,'Luis','Fernández','luis.fernandez@gmail.com','$2b$10$hashmesero02','3001112237','MESERO','Peruana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/5.jpg',1,'',NULL,NULL),(27,'Sofía','López','sofia.lopez@gmail.com','$2b$10$hashcliente02','3001112238','CLIENTE','Argentina','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/6.jpg',1,'',NULL,NULL),(28,'Diego','Ramírez','diego.ramirez@gmail.com','$2b$10$hashcocinero02','3001112239','COCINERO','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/7.jpg',1,'',NULL,NULL),(29,'Valentina','Torres','valentina.torres@gmail.com','147258A#','3001112240','ADMINISTRADOR','Åland Islands','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/8.jpg',1,'1069744856',NULL,NULL),(30,'Andrés','Castro','andres.castro@gmail.com','$2b$10$hashmesero03','3001112241','MESERO','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/9.jpg',1,'',NULL,NULL),(31,'Camila','Morales','camila.morales@gmail.com','$2b$10$hashcliente04','3001112242','CLIENTE','Ecuatoriana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/10.jpg',1,'',NULL,NULL),(32,'Jorge','Vargas','jorge.vargas@gmail.com','$2b$10$hashcocinero03','3001112243','COCINERO','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/11.jpg',1,'',NULL,NULL),(33,'Laura','Rojas','laura.rojas@gmail.com','$2b$10$hashmesero04','3001112244','MESERO','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/12.jpg',1,'',NULL,NULL),(34,'Miguel','Herrera','miguel.herrera@gmail.com','$2b$10$hashcliente05','3001112245','CLIENTE','Venezolana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/13.jpg',1,'',NULL,NULL),(35,'Paula','Navarro','paula.navarro@gmail.com','$2b$10$hashcliente06','3001112246','CLIENTE','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/14.jpg',1,'',NULL,NULL),(36,'Sebastián','Ortega','sebastian.ortega@gmail.com','$2b$10$hashadmin02','3001112247','ADMINISTRADOR','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/15.jpg',1,'',NULL,NULL),(37,'Daniela','Mendoza','daniela.mendoza@gmail.com','$2b$10$hashmesero05','3001112248','MESERO','Peruana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/16.jpg',1,'',NULL,NULL),(38,'Felipe','Silva','felipe.silva@gmail.com','$2b$10$hashcocinero04','3001112249','COCINERO','Brasileña','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/17.jpg',1,'',NULL,NULL),(39,'Natalia','Jiménez','natalia.jimenez@gmail.com','$2b$10$hashcliente07','3001112250','CLIENTE','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/18.jpg',1,'',NULL,NULL),(40,'Ricardo','Suárez','ricardo.suarez@gmail.com','$2b$10$hashmesero06','3001112251','MESERO','Uruguaya','2026-05-24 22:11:23','https://randomuser.me/api/portraits/men/19.jpg',1,'',NULL,NULL),(41,'Gabriela','Peña','gabriela.pena@gmail.com','$2b$10$hashcliente08','3001112252','CLIENTE','Colombiana','2026-05-24 22:11:23','https://randomuser.me/api/portraits/women/20.jpg',0,'',NULL,NULL),(42,'Josué','Ortega','jorge.ortegadvk@hotmail.com','123456789A#','3124568596','ADMINISTRADOR','Argentina',NULL,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782760672/ordena/users/o6syxghi3gck534is1ka.jpg',1,'1085153264',NULL,NULL),(47,'Manuel','Ortega','jorge.ortegak@hotmail.com','123456789dvk#','3124568596','ADMINISTRADOR','americano',NULL,NULL,1,'',NULL,NULL),(49,'Manuel','osted','jorge@hotmail.com','123456789dvk#','3124568596','ADMINISTRADOR','americano',NULL,NULL,1,'',NULL,NULL),(50,'Alejandra','Sanchez','a.s@hotmail.com','123456789dvk#','3124568596','ADMINISTRADOR','americano',NULL,'https://example.com/clients/jorge.jpg',1,'',NULL,NULL),(62,'Jose','Godoy','sads@sadbh.com','123456D#','1234567890','COCINERO','Armenia',NULL,'https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782757481/ordena/users/zpqhyey2z5tw1cpx3gbo.jpg',1,'1069744856','CEDULA DE CIUDADANIA','2008-04-21'),(64,'Juan','Godoy','sads@sad.com','@123456A','1234567890','COCINERO','Armenia',NULL,'',1,'1069744856','CEDULA DE CIUDADANIA','2008-04-21'),(65,'Steven','Cabrales','stevencara20@gmail.com','123456A#','3527856985','ADMINISTRADOR','Burundi',NULL,'',1,'1234567895','CEDULA DE EXTRANJERIA',NULL),(66,'Steven','Carabela','stevencara2019@hotmail.com','123456A#','3158627485','MESERO','Argentina',NULL,'',1,'1256789357','CEDULA DE CIUDADANIA','2008-01-01'),(70,'Manuela','osteda','jorge7aa@hotmail.com','123789Q\"','3124568596','ADMINISTRADOR','americano','2026-06-19 01:56:12','https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782757774/ordena/users/exuswgbdry7kfopqt4v7.jpg',1,'123456','CEDULA DE CIUDADANIA','2016-05-14'),(74,'PEDRO','RAMOS','pedro.ramos@hotmail.com','123456A#','3152697456','MESERO','Algeria','2026-06-29 17:15:12','https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782753220/ordena/users/fnlswnqot9v9v2ol13mr.jpg',1,'10697894125','CEDULA DE EXTRANJERIA','2008-04-14'),(75,'Maria','Sharapov','maria.sharapov@gmail.com','789456A#','3214259630','COCINERO','Angola','2026-06-29 19:19:59','https://res.cloudinary.com/dbhwc6lgi/image/upload/v1782760772/ordena/users/bfqylho06arvyxbvrgw2.jpg',1,'51264865','CEDULA DE EXTRANJERIA','2008-04-08');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-07 19:15:16
