-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: cantin
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.21.10.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AUTHORIZATION`
--

DROP TABLE IF EXISTS `AUTHORIZATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AUTHORIZATION` (
  `AUTH_ID` int NOT NULL AUTO_INCREMENT,
  `DATE_TIME` datetime NOT NULL,
  PRIMARY KEY (`AUTH_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=100004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AUTHORIZATION`
--

LOCK TABLES `AUTHORIZATION` WRITE;
/*!40000 ALTER TABLE `AUTHORIZATION` DISABLE KEYS */;
INSERT INTO `AUTHORIZATION` VALUES (100001,'2011-09-11 22:33:44'),(100002,'2012-09-11 22:33:44'),(100003,'2012-09-11 22:33:45');
/*!40000 ALTER TABLE `AUTHORIZATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CUST_ID` int NOT NULL AUTO_INCREMENT,
  `FNAME` varchar(15) NOT NULL,
  `LNAME` varchar(15) NOT NULL,
  `PHONE_NO` decimal(10,0) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `PROFILE_PIC` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`CUST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (10001,'Soap','Mactavish',9876543210,'soapmactavish@SAS.reg','sasds','https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/user_icon_004.webp'),(10002,'PRATEEK','K',8765342109,'prateek@gmail.com','patrick',NULL),(10003,'ANIKETH','A',3465342109,'aniketh@gmail.com','aniketh',NULL),(10004,'ANIRUDH','K',4965242109,'anirudh@gmail.com','anirudh',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `FOOD_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) NOT NULL,
  `PRICE` int NOT NULL,
  `INVENTORY_COUNT` int NOT NULL,
  `REST_ID` int NOT NULL,
  `IMAGE` varchar(200) NOT NULL,
  PRIMARY KEY (`FOOD_ID`),
  KEY `REST_ID` (`REST_ID`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`REST_ID`) REFERENCES `restaurant` (`REST_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=300007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (300001,'burger',100,450,900001,'https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/burger.jpg'),(300002,'burger',110,4,900002,'https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/burger.jpg'),(300003,'burger',120,425,900003,'https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/burger.jpg'),(300004,'paneer butter masala',90,200,900001,'https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/panner_butter_masala.jpg'),(300005,'paneer butter masala',100,250,900002,'https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/panner_butter_masala.jpg'),(300006,'paneer butter masala',110,210,900003,'https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/panner_butter_masala.jpg');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `ORDER_ID` int NOT NULL,
  `FOOD_ID` int NOT NULL,
  `QTY` int NOT NULL,
  KEY `FOOD_ID` (`FOOD_ID`),
  KEY `ORDER_ID` (`ORDER_ID`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`FOOD_ID`) REFERENCES `food` (`FOOD_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders_list` (`ORDER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (700001,300001,1),(700002,300001,2),(700002,300004,3);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `ORDER_ID` int NOT NULL,
  `CUST_ID` int NOT NULL,
  `REST_ID` int NOT NULL,
  PRIMARY KEY (`ORDER_ID`,`CUST_ID`,`REST_ID`),
  KEY `CUST_ID` (`CUST_ID`),
  KEY `REST_ID` (`REST_ID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CUST_ID`) REFERENCES `customer` (`CUST_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders_list` (`ORDER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`REST_ID`) REFERENCES `restaurant` (`REST_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (700001,10001,900001),(700002,10001,900001);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_list`
--

DROP TABLE IF EXISTS `orders_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_list` (
  `ORDER_ID` int NOT NULL AUTO_INCREMENT,
  `ORDER_NO` int NOT NULL,
  `STATUS` varchar(15) NOT NULL,
  `TOTAL_AMT` int NOT NULL,
  `DATE_TIME` datetime NOT NULL,
  PRIMARY KEY (`ORDER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=700003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_list`
--

LOCK TABLES `orders_list` WRITE;
/*!40000 ALTER TABLE `orders_list` DISABLE KEYS */;
INSERT INTO `orders_list` VALUES (700001,1,'TRANSACT NA',100,'2022-07-09 10:12:34'),(700002,1,'TRANSACT NA',470,'2022-04-15 19:04:04');
/*!40000 ALTER TABLE `orders_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `CUST_ID` int NOT NULL,
  `FOOD_ID` int NOT NULL,
  `RATING` int NOT NULL,
  PRIMARY KEY (`CUST_ID`,`FOOD_ID`),
  KEY `FOOD_ID` (`FOOD_ID`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`CUST_ID`) REFERENCES `customer` (`CUST_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`FOOD_ID`) REFERENCES `food` (`FOOD_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `REST_ID` int NOT NULL AUTO_INCREMENT,
  `REST_NAME` varchar(15) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `AUTH_ID` int NOT NULL,
  `PHONE_NO` decimal(10,0) NOT NULL,
  `STATUS` varchar(15) NOT NULL,
  `IMAGE_URL` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`REST_ID`),
  KEY `AUTH_ID` (`AUTH_ID`),
  CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`AUTH_ID`) REFERENCES `AUTHORIZATION` (`AUTH_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=900004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (900001,'CAFE DE COSTA','cafedecosta@gmail.com','cafe',100001,7680563412,'OPEN','https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/rest_image(3).jpeg'),(900002,'RAMIAH CANTEEN','ramaiahcant@gmail.com','cant',100002,1230563412,'OPEN','https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/rest_image(4).jpeg'),(900003,'KFC','kfc@gmail.com','kfc',100003,7890123412,'OPEN','https://raw.githubusercontent.com/adityarnayak2001/canteen_app_images/main/rest_image(5).jpeg');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `TRANSACTION_ID` int NOT NULL AUTO_INCREMENT,
  `AMOUNT` int NOT NULL,
  `DATE_TIME` datetime NOT NULL,
  `ORDER_ID` int NOT NULL,
  PRIMARY KEY (`TRANSACTION_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-15 19:29:51
