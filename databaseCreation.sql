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
  `paymentDue` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkTier_idx` (`fkTier` ASC) VISIBLE,
  CONSTRAINT `fkTier`
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
  PRIMARY KEY (`id`),
  INDEX `fkBrand_idx` (`fkBrand` ASC) VISIBLE,
  INDEX `fkSocialNetwork_idx` (`fkSocialNetwork` ASC) VISIBLE,
  CONSTRAINT `fkBrand`
    FOREIGN KEY (`fkBrand`)
    REFERENCES `marketing`.`brand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkSocialNetwork`
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
  PRIMARY KEY (`id`),
  INDEX `fkCountry_idx` (`fkCountry` ASC) VISIBLE,
  CONSTRAINT `fkCountry`
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
  PRIMARY KEY (`id`),
  INDEX `fkUser_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fkSocialNetwork_idx` (`fkSocialNetwork` ASC) VISIBLE,
  CONSTRAINT `fkUser`
    FOREIGN KEY (`fkUser`)
    REFERENCES `marketing`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkSocialNetwork_1`
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
  PRIMARY KEY (`id`),
  INDEX `fkUser_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fkBrand_idx` (`fkBrand` ASC) VISIBLE,
  CONSTRAINT `fkUser_1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `marketing`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkBrand_1`
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
  PRIMARY KEY (`id`),
  INDEX `fkUserBrand_idx` (`fkUserBrand` ASC) VISIBLE,
  INDEX `fkSocialNetwork_idx` (`fkSocialNetwork` ASC) VISIBLE,
  CONSTRAINT `fkUserBrand`
    FOREIGN KEY (`fkUserBrand`)
    REFERENCES `marketing`.`userBrand` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkSocialNetwork_2`
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
  PRIMARY KEY (`id`),
  INDEX `fkBrandSocial_idx` (`fkBrandSocial` ASC) VISIBLE,
  CONSTRAINT `fkBrandSocial`
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
  PRIMARY KEY (`id`),
  INDEX `fkBrandSocial_idx` (`fkBrandSocial` ASC) VISIBLE,
  INDEX `fkWordTrend_idx` (`fkWordTrend` ASC) VISIBLE,
  CONSTRAINT `fkBrandSocial_1`
    FOREIGN KEY (`fkBrandSocial`)
    REFERENCES `marketing`.`brandSocial` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkWordTrend`
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
  PRIMARY KEY (`id`),
  INDEX `fkBrandPost_idx` (`fkBrandPost` ASC) VISIBLE,
  INDEX `fkUser_idx` (`fkUser` ASC) VISIBLE,
  CONSTRAINT `fkBrandPost`
    FOREIGN KEY (`fkBrandPost`)
    REFERENCES `marketing`.`brandPost` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkUser_2`
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
  INDEX `fkUserPost_idx` (`fkUserPost` ASC) VISIBLE,
  CONSTRAINT `fkUserPost`
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
  PRIMARY KEY (`id`),
  INDEX `fkInteractionType_idx` (`fkInteractionType` ASC) VISIBLE,
  INDEX `fkUserPost_idx` (`fkUserPost` ASC) VISIBLE,
  INDEX `fkUserComment_idx` (`fkUserComment` ASC) VISIBLE,
  INDEX `fkBrandPost_1` (`fkBrandPost` ASC) VISIBLE,
  CONSTRAINT `fkBrandComment`
    FOREIGN KEY (`fkBrandComment`)
    REFERENCES `marketing`.`brandComment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkInteractionType`
    FOREIGN KEY (`fkInteractionType`)
    REFERENCES `marketing`.`interactionType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkUserPost_1`
    FOREIGN KEY (`fkUserPost`)
    REFERENCES `marketing`.`userPost` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkUserComment`
    FOREIGN KEY (`fkUserComment`)
    REFERENCES `marketing`.`userComment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkBrandPost_1`
    FOREIGN KEY (`fkBrandPost`)
    REFERENCES `marketing`.`brandPost` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
