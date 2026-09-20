CREATE DATABASE  IF NOT EXISTS `fortress_vault` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fortress_vault`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fortress_vault
-- ------------------------------------------------------
-- Server version	8.0.35

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

--
-- Table structure for table `tbl_categorias`
--

DROP TABLE IF EXISTS `tbl_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_categorias` (
  `catid` int NOT NULL AUTO_INCREMENT,
  `catcod` char(4) DEFAULT NULL,
  `catnom` varchar(100) DEFAULT NULL,
  `usuid` int DEFAULT NULL COMMENT 'Id del usuario que le pertenece la categoria',
  PRIMARY KEY (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_categorias`
--

LOCK TABLES `tbl_categorias` WRITE;
/*!40000 ALTER TABLE `tbl_categorias` DISABLE KEYS */;
INSERT INTO `tbl_categorias` VALUES (1,'PER','Personal',0),(2,'BAN','Bancario',0),(3,'TRA','Trabajo',0),(4,'STR','Streaming',0),(5,'RSC','Redes Sociales',0),(6,'PRO','Propia',1);
/*!40000 ALTER TABLE `tbl_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contras`
--

DROP TABLE IF EXISTS `tbl_contras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contras` (
  `conid` int NOT NULL AUTO_INCREMENT,
  `connom` varchar(100) DEFAULT NULL COMMENT 'Nombre de la aplicacion',
  `conusuario` varchar(100) DEFAULT NULL COMMENT 'Usuario o email con el que ingresan a esa app',
  `conpwd` text COMMENT 'Contra con la que ingresan a esa app=',
  `connom_icon` varchar(200) DEFAULT NULL COMMENT 'Nombre del icono seleccionado',
  `usuid` int DEFAULT NULL COMMENT 'Id del usuario que creo esa contra',
  `catid` int DEFAULT NULL COMMENT 'Id de la categoria',
  PRIMARY KEY (`conid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contras`
--

LOCK TABLES `tbl_contras` WRITE;
/*!40000 ALTER TABLE `tbl_contras` DISABLE KEYS */;
INSERT INTO `tbl_contras` VALUES (3,'Youtube','juanacostamillos69@gmail.com','e65f4083398c3e92f61d68f8:b9b91ea4aab03af61cee33ce4217fde7:65f1223192c054b0f5bac5','YoutubeLogoIcon',1,4),(4,'Davivienda','1014477770','b31155563594cd5ae0fe65de:f0948e1d8b4cbe0164e772d4d7564f4f:c59604d5fe95','BankIcon',1,2),(5,'Gmail','d.acosta.ebsoft@gmail.com','77a000f34a385cc2b3a6315b:ce19d66a13087a588ab59b75b1a19945:b0a24c05a02b6899ee500c','AtIcon',1,3),(6,'Caja Social','CC1014477770','e43f94b24c5b2ba165b3beb2:6e5f0deced395dc7ddc37093ce347b11:b6d95f9ce85fdae6','BankIcon',1,2),(7,'Postman','d.acosta.ebsoft@gmail.com','fb2325b526866a8d650da3b7:706ac7bb4ce092c357628c57ed634e66:d47b7e2678f8172adf2953c105bbc5401b4d3d0395f97e30b9c924dcb09609a40921d99e92f730d1a89e96cd9e9ad33e61bdff813fd8086a3875d5edd7ced88404f4136eb0ea4865c8ef3b27066db37ce699f31dd7a934fc4d2623209133310b3361fd190b6e048804b6e5d8a38ca5289626e8309c9d6643eb7b09183cfc2976695c07472c37470c430306d0d89f5901d9e61d376c6c29e27df562d6d14c29c6b0b46a40a3ce9d54e9eff21967d5c2a298683d916cc2e34e9605360fa086','BagIcon',1,1),(8,'Prueba de nueva','jajjaja','03c3a19efc15f9429746b0b9:6f963f4d0846bcf0be0bb07017380c3d:078b702579c4','BagIcon',1,6);
/*!40000 ALTER TABLE `tbl_contras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_log`
--

DROP TABLE IF EXISTS `tbl_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_log` (
  `logid` int NOT NULL AUTO_INCREMENT,
  `logtip` char(3) DEFAULT NULL COMMENT '(INS) Insert, (UPD), Update, (DEL) Delete',
  `logfec` datetime DEFAULT NULL,
  `conid` int DEFAULT NULL COMMENT 'Id cuando sea crea una aplicacion',
  `catid` int DEFAULT NULL COMMENT 'Id cuando se crea una categoria',
  `usuid` int DEFAULT NULL COMMENT 'Id del usuario que hizo la accion',
  PRIMARY KEY (`logid`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_log`
--

LOCK TABLES `tbl_log` WRITE;
/*!40000 ALTER TABLE `tbl_log` DISABLE KEYS */;
INSERT INTO `tbl_log` VALUES (1,'INS','2026-07-29 12:38:45',2,NULL,1),(2,'DEL','2026-07-29 12:42:23',1,NULL,1),(3,'DEL','2026-07-29 12:42:39',2,NULL,1),(4,'INS','2026-07-30 20:12:53',NULL,1,1),(5,'INS','2026-07-30 20:13:14',NULL,1,1),(6,'INS','2026-07-30 20:13:30',NULL,1,1),(7,'INS','2026-07-30 20:13:40',NULL,1,1),(8,'INS','2026-07-30 20:14:28',NULL,1,1),(9,'INS','2026-07-30 20:15:13',NULL,1,1),(10,'INS','2026-07-30 20:15:41',NULL,1,1),(11,'INS','2026-07-30 20:16:41',NULL,1,1),(12,'UPD','2026-07-30 20:29:59',NULL,1,1),(13,'UPD','2026-07-30 20:30:11',NULL,1,1),(14,'UPD','2026-07-30 20:30:20',NULL,2,1),(15,'UPD','2026-07-30 20:30:23',NULL,2,1),(16,'DEL','2026-07-30 20:38:14',NULL,1,1),(17,'INS','2026-07-30 20:38:26',NULL,2,1),(18,'DEL','2026-07-30 20:38:31',NULL,2,1),(19,'INS','2026-08-24 22:21:26',3,NULL,1),(20,'INS','2026-08-26 20:10:25',1,NULL,1),(21,'INS','2026-08-30 16:17:34',2,NULL,1),(22,'DEL','2026-08-30 16:30:17',2,NULL,1),(23,'DEL','2026-08-30 16:31:31',1,NULL,1),(24,'INS','2026-08-30 17:02:23',3,NULL,1),(25,'INS','2026-08-30 17:03:07',4,NULL,1),(26,'UPD','2026-09-03 20:34:58',3,NULL,1),(27,'UPD','2026-09-03 20:35:55',3,NULL,1),(28,'INS','2026-09-03 20:38:59',5,NULL,1),(29,'UPD','2026-09-03 20:39:05',5,NULL,1),(30,'UPD','2026-09-03 20:39:12',5,NULL,1),(31,'INS','2026-09-03 21:00:29',1,NULL,1),(32,'DEL','2026-09-05 16:02:51',1,NULL,1),(33,'INS','2026-09-05 16:03:10',2,NULL,1),(34,'UPD','2026-09-05 16:03:29',2,NULL,1),(35,'DEL','2026-09-05 16:03:32',2,NULL,1),(36,'INS','2026-09-05 16:04:47',3,NULL,1),(37,'INS','2026-09-05 16:05:14',4,NULL,1),(38,'INS','2026-09-05 16:05:46',5,NULL,1),(39,'INS','2026-09-05 16:06:22',6,NULL,1),(40,'INS','2026-09-05 16:06:52',7,NULL,1),(41,'UPD','2026-09-05 16:07:44',7,NULL,1),(42,'UPD','2026-09-05 16:21:12',7,NULL,1),(43,'INS','2026-09-19 20:41:35',NULL,6,1),(44,'INS','2026-09-19 20:46:15',8,NULL,1),(45,'UPD','2026-09-19 20:50:41',NULL,6,1),(46,'UPD','2026-09-19 20:51:05',NULL,6,1),(47,'UPD','2026-09-19 20:51:13',NULL,6,1),(48,'UPD','2026-09-19 20:51:19',NULL,6,1);
/*!40000 ALTER TABLE `tbl_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuario`
--

DROP TABLE IF EXISTS `tbl_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuario` (
  `usuid` int NOT NULL AUTO_INCREMENT,
  `usunom` varchar(100) DEFAULT NULL,
  `usuemail` varchar(100) DEFAULT NULL,
  `usupwd` text,
  PRIMARY KEY (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuario`
--

LOCK TABLES `tbl_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_usuario` DISABLE KEYS */;
INSERT INTO `tbl_usuario` VALUES (1,'Jeisson Acosta','json@gmail.com','$2b$10$mPFXFJCzO3k2MeQ2XrhU1eKQsq3530j78kA69Iabtycb38mi9vVi2');
/*!40000 ALTER TABLE `tbl_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'fortress_vault'
--
/*!50003 DROP PROCEDURE IF EXISTS `auth_register_user_app` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `auth_register_user_app`(
IN i_usunom VARCHAR(100),
IN i_usuemail VARCHAR(100),
IN i_usupwd TEXT
)
BEGIN

SET @_usuid_inserted = null;

START TRANSACTION;

INSERT INTO tbl_usuario(
	usunom,
    usuemail,
    usupwd
) VALUES (
	i_usunom,
    i_usuemail,
    i_usupwd
);

SET @_usuid_inserted = LAST_INSERT_ID();

COMMIT;

SELECT
	usuid,
    usunom,
    usuemail
FROM tbl_usuario
WHERE usuid = @_usuid_inserted;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `category_get_list_x_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `category_get_list_x_user`( IN i_usuid INT )
BEGIN

    SET @_total_categories = (SELECT COUNT(*) FROM tbl_categorias WHERE usuid = i_usuid);

    DROP TABLE IF EXISTS tbltmp_category_more_frecuency;
    CREATE TEMPORARY TABLE tbltmp_category_more_frecuency AS (
        SELECT
            cat.catnom,
            COUNT(*) AS counter
        FROM tbl_contras con
        LEFT JOIN tbl_categorias cat ON con.catid = cat.catid
        WHERE cat.usuid = i_usuid
        GROUP BY con.catid
        ORDER BY counter DESC LIMIT 1
    );

    SET @_catnom_more_frecuency = (SELECT catnom FROM tbltmp_category_more_frecuency);

    SELECT
        @_total_categories AS total_categories,
        @_catnom_more_frecuency AS catnom_more_frecuency,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'catid', cat.catid,
                'catcod', cat.catcod,
                'catnom', cat.catnom,
                'cattotal', (SELECT COUNT(*) FROM tbl_contras con WHERE con.catid = cat.catid)
            )
        ) AS list_categories
    FROM tbl_categorias cat
    WHERE cat.usuid = i_usuid;

    DROP TABLE IF EXISTS tbltmp_category_more_frecuency;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `category_manage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `category_manage`(
IN i_catid INT,
IN i_catcod CHAR(4),
IN i_catnom VARCHAR(100),
IN i_usuid INT,
IN i_opcion CHAR(3)
)
BEGIN

SET @_catid_inserted = null;

START TRANSACTION;

IF i_opcion = "INS" THEN

	INSERT INTO tbl_categorias(
		catcod,
		catnom,
		usuid
	) VALUES (
		i_catcod,
		i_catnom,
		i_usuid
	);
    
    SET @_catid_inserted = LAST_INSERT_ID();
    
END IF;

IF i_opcion = 'UPD' THEN

	UPDATE tbl_categorias
    SET catcod = i_catcod,
    catnom = i_catnom
    WHERE catid = i_catid;
    
    SET @_catid_inserted = i_catid;

END IF;

IF i_opcion = 'DEL' THEN

	SET @_catid_inserted = i_catid;
    
    DELETE FROM tbl_categorias
    WHERE catid = i_catid;

END IF;

INSERT INTO tbl_log(
	logtip,
	logfec,
	catid,
    usuid
) VALUES(
	i_opcion,
	NOW(),
	@_catid_inserted,
    i_usuid
);

COMMIT;

IF i_opcion != 'DEL' THEN

	SELECT
		catid,
		catcod,
        catnom
	FROM tbl_categorias
    WHERE catid = @_catid_inserted;
		
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `load_info_option_vault` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `load_info_option_vault`(
	IN i_usuid INT
)
BEGIN

SET lc_time_names = 'es_ES';
SET @@session.time_zone = "-05:00";

SET @_total_entries = (SELECT COUNT(*) FROM tbl_contras WHERE usuid = i_usuid);
SET @_total_categories = (SELECT COUNT(*) FROM tbl_categorias WHERE usuid = i_usuid OR usuid = 0);

SET @_category_list = (
	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'catid', catid,
                'catcod', catcod,
                'catnom', catnom
            )
        )
	FROM tbl_categorias
    WHERE usuid = 0 OR usuid = i_usuid
);

SET @_passwords_list = (
	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'conid', con.conid,
                'catid', con.catid,
                'connom', con.connom,
                'conusuario', con.conusuario,
                'conpwd', con.conpwd,
                'connom_icon', con.connom_icon,
                'catcod', cat.catcod,
                'catnom', cat.catnom
			)
        )
	FROM tbl_contras con
    JOIN tbl_categorias cat ON con.catid = cat.catid
    WHERE con.usuid = i_usuid
);

SET @_log_list = (
	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'logid', logid,
                'logtip', logtip,
                'logtip_text', IF(logtip = 'INS' AND conid IS NOT NULL, 
					'Contraseña Creada', 
                    IF(logtip = 'INS' AND catid IS NOT NULL, 
						'Categoria Creada', 
                        IF(logtip = 'UPD' AND conid IS NOT NULL, 'Contraseña Actualizada',
							IF(logtip = 'UPD' AND catid IS NOT NULL, 'Categoria Actualizada',
								IF(logtip = 'DEL' AND conid IS NOT NULL, 'Contraseña Eliminada', 'Contraseña Actualizada')
                            )
                        )
					)
				),
                'logfec', DATE_FORMAT(logfec, '%d de %M - %h:%i %p')
            )
        )
	FROM tbl_log
    ORDER BY logid DESC
    LIMIT 10
);

SELECT
	IFNULL(@_total_entries, 0) AS total_entries,
    IFNULL(@_total_categories, 0) AS total_categories,
    @_category_list AS category_list,
    @_passwords_list AS passwords_list,
    @_log_list AS log_list;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `log_get_list_x_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `log_get_list_x_user`( 
IN i_usuid INT 
)
BEGIN

    SELECT
        log.logid,
        log.logtip,
        log.logfec,
        log.conid,
        log.catid,
        con.connom AS connom,
        cat.catnom AS catnom
    FROM tbl_log log
    LEFT JOIN tbl_contras con ON log.conid = con.conid
    LEFT JOIN tbl_categorias cat ON log.catid = cat.catid
    WHERE log.usuid = i_usuid
    ORDER BY log.logfec DESC;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `main_app_create_app` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `main_app_create_app`(
IN i_conid INT,
IN i_connom VARCHAR(100),
IN i_conusuario VARCHAR(100),
IN i_conpwd TEXT,
IN i_connom_icon VARCHAR(200),
IN i_usuid INT,
IN i_catid INT,
IN i_opcion CHAR(3)
)
BEGIN

-- ///// i_opcion /////
	-- (INS) INSert
    -- (UPD) UPDate
    -- (DEL) DELete
-- ////////////////////

SET @_conid_inserted = null;

START TRANSACTION;

IF i_opcion = "INS" THEN 

	INSERT INTO tbl_contras(
		connom,
		conusuario,
		conpwd,
		connom_icon,
		usuid,
		catid
	) VALUES(
		i_connom,
		i_conusuario,
		i_conpwd,
		i_connom_icon,
		i_usuid,
		i_catid
	);

	SET @_conid_inserted = LAST_INSERT_ID();
    
    INSERT INTO tbl_log(
		logtip,
		logfec,
        conid,
        usuid
    ) VALUES (
		'INS',
		NOW(),
        @_conid_inserted,
        i_usuid
    );
    
END IF;

IF i_opcion = "UPD" THEN

	UPDATE tbl_contras
    SET connom = i_connom,
    conusuario = i_conusuario,
    conpwd = i_conpwd,
    connom_icon = i_connom_icon,
    catid = i_catid
    WHERE conid = i_conid;
    
    SET @_conid_inserted = i_conid;
    
    INSERT INTO tbl_log(
		logtip,
		logfec,
        conid,
        usuid
    ) VALUES (
		'UPD',
		NOW(),
        @_conid_inserted,
        i_usuid
    );

END IF;

IF i_opcion = "DEL" THEN

	DELETE FROM tbl_contras
    WHERE conid = i_conid;
    
	INSERT INTO tbl_log(
		logtip,
		logfec,
        conid,
        usuid
    ) VALUES (
		'DEL',
		NOW(),
        i_conid,
        i_usuid
    );

END IF;

COMMIT;

IF i_opcion <> 'DEL' THEN

	SELECT
		connom,
		conusuario,
		conpwd,
		connom_icon,
		catid
	FROM tbl_contras
	WHERE conid = @_conid_inserted;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-19 21:07:55
