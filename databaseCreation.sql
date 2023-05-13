-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema marketing
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema marketing
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `marketing` ;
USE `marketing` ;

-- -----------------------------------------------------
-- Table `marketing`.`tier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`tier` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`brand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`brand` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `passwordHash` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `fkTier` INT NOT NULL,
  `paymentDue` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`, `fkTier`),
  INDEX `fk_cliente_nivel_paga_idx` (`fkTier` ASC) VISIBLE,
  CONSTRAINT `fk_cliente_nivel_paga`
    FOREIGN KEY (`fkTier`)
    REFERENCES `marketing`.`tier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`socialNetwork`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`socialNetwork` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`brandSocial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`brandSocial` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkBrand` INT NOT NULL,
  `fkSocialNetwork` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `creationDate` DATE NOT NULL,
  PRIMARY KEY (`id`, `fkSocialNetwork`, `fkBrand`),
  INDEX `fk_det_redes_cliente_cliente1_idx` (`fkBrand` ASC) VISIBLE,
  INDEX `fk_det_redes_cliente_red_social1_idx` (`fkSocialNetwork` ASC) VISIBLE,
  CONSTRAINT `fk_det_redes_cliente_cliente1`
    FOREIGN KEY (`fkBrand`)
    REFERENCES `marketing`.`brand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_det_redes_cliente_red_social1`
    FOREIGN KEY (`fkSocialNetwork`)
    REFERENCES `marketing`.`socialNetwork` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `fkCountry` INT NOT NULL,
  PRIMARY KEY (`id`, `fkCountry`),
  INDEX `fk_usuario_país1_idx` (`fkCountry` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_país1`
    FOREIGN KEY (`fkCountry`)
    REFERENCES `marketing`.`country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = gbk;


-- -----------------------------------------------------
-- Table `marketing`.`userSocial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`userSocial` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkUser` INT NOT NULL,
  `fkSocialNetwork` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `creationDate` DATE NOT NULL,
  PRIMARY KEY (`id`, `fkUser`, `fkSocialNetwork`),
  INDEX `fk_redes_usuarios_usuario1_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fk_redes_usuarios_red_social1_idx` (`fkSocialNetwork` ASC) VISIBLE,
  CONSTRAINT `fk_redes_usuarios_usuario1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `marketing`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_redes_usuarios_red_social1`
    FOREIGN KEY (`fkSocialNetwork`)
    REFERENCES `marketing`.`socialNetwork` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`userBrand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`userBrand` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkUser` INT NOT NULL,
  `fkBrand` INT NOT NULL,
  `sentiment` FLOAT NOT NULL,
  PRIMARY KEY (`id`, `fkUser`, `fkBrand`),
  INDEX `fk_det_marca_usuario_usuario1_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fk_det_marca_usuario_marca1_idx` (`fkBrand` ASC) VISIBLE,
  CONSTRAINT `fk_det_marca_usuario_usuario1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `marketing`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_det_marca_usuario_marca1`
    FOREIGN KEY (`fkBrand`)
    REFERENCES `marketing`.`brand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`userPost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`userPost` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkUserBrand` INT NOT NULL,
  `fkSocialNetwork` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `sentiment` FLOAT NOT NULL,
  PRIMARY KEY (`id`, `fkUserBrand`, `fkSocialNetwork`),
  INDEX `fk_comentario_det_marca_usuario1_idx` (`fkUserBrand` ASC) VISIBLE,
  INDEX `fk_comentario_red_social1_idx` (`fkSocialNetwork` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_det_marca_usuario1`
    FOREIGN KEY (`fkUserBrand`)
    REFERENCES `marketing`.`userBrand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentario_red_social1`
    FOREIGN KEY (`fkSocialNetwork`)
    REFERENCES `marketing`.`socialNetwork` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`brandPost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`brandPost` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkBrandSocial` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `publicReaction` FLOAT NOT NULL,
  PRIMARY KEY (`id`, `fkBrandSocial`),
  INDEX `fk_publicación_det_redes_marca1_idx` (`fkBrandSocial` ASC) VISIBLE,
  CONSTRAINT `fk_publicación_det_redes_marca1`
    FOREIGN KEY (`fkBrandSocial`)
    REFERENCES `marketing`.`brandSocial` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`interactionType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`interactionType` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`wordTrend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`wordTrend` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `word` VARCHAR(45) NOT NULL,
  `scoreWeek` INT NOT NULL,
  `scoreMonth` INT NOT NULL,
  `scoreYear` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`lexical`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`lexical` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkBrandSocial` INT NOT NULL,
  `fkWordTrend` INT NOT NULL,
  `frequency` INT NOT NULL,
  PRIMARY KEY (`id`, `fkBrandSocial`, `fkWordTrend`),
  INDEX `fk_palabras_redes_marca1_idx` (`fkBrandSocial` ASC) VISIBLE,
  INDEX `fk_léxico_marca_red_palabra_tendencia1_idx` (`fkWordTrend` ASC) VISIBLE,
  CONSTRAINT `fk_palabras_redes_marca1`
    FOREIGN KEY (`fkBrandSocial`)
    REFERENCES `marketing`.`brandSocial` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_léxico_marca_red_palabra_tendencia1`
    FOREIGN KEY (`fkWordTrend`)
    REFERENCES `marketing`.`wordTrend` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`userComment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`userComment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkBrandPost` INT NOT NULL,
  `fkUser` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `sentiment` FLOAT NOT NULL,
  PRIMARY KEY (`id`, `fkUser`, `fkBrandPost`),
  INDEX `fk_comentario_publicación1_idx` (`fkBrandPost` ASC) VISIBLE,
  INDEX `fk_comentario_usuario1_idx` (`fkUser` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_publicación1`
    FOREIGN KEY (`fkBrandPost`)
    REFERENCES `marketing`.`brandPost` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentario_usuario1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `marketing`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`brandComment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`brandComment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fkUserPost` INT NOT NULL,
  `dateTime` DATETIME NOT NULL,
  `publicReaction` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_respuesta_marca_publicación_tercero1_idx` (`fkUserPost` ASC) VISIBLE,
  CONSTRAINT `fk_respuesta_marca_publicación_tercero1`
    FOREIGN KEY (`fkUserPost`)
    REFERENCES `marketing`.`userPost` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `marketing`.`interaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing`.`interaction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` INT NOT NULL,
  `fkInteractionType` INT NOT NULL,
  `fkBrandPost` INT NOT NULL,
  `fkBrandComment` INT NOT NULL,
  `fkUserPost` INT NOT NULL,
  `fkUserComment` INT NOT NULL,
  PRIMARY KEY (`id`, `fkInteractionType`),
  INDEX `fk_interacciones_respuesta_interacciones1_idx` (`fkInteractionType` ASC) VISIBLE,
  INDEX `fk_interacciones_respuesta_publicación_tercero1_idx` (`fkUserPost` ASC) VISIBLE,
  INDEX `fk_interacciones_respuesta_comentario1_idx` (`fkUserComment` ASC) VISIBLE,
  INDEX `fk_interacciones_respuesta_publicación1_idx` (`fkBrandPost` ASC) VISIBLE,
  CONSTRAINT `fk_interacciones_respuesta_respuesta_marca1`
    FOREIGN KEY (`fkBrandComment`)
    REFERENCES `marketing`.`brandComment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interacciones_respuesta_interacciones1`
    FOREIGN KEY (`fkInteractionType`)
    REFERENCES `marketing`.`interactionType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interacciones_respuesta_publicación_tercero1`
    FOREIGN KEY (`fkUserPost`)
    REFERENCES `marketing`.`userPost` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interacciones_respuesta_comentario1`
    FOREIGN KEY (`fkUserComment`)
    REFERENCES `marketing`.`userComment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_interacciones_respuesta_publicación1`
    FOREIGN KEY (`fkBrandPost`)
    REFERENCES `marketing`.`brandPost` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
