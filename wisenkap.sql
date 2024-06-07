-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 07 juin 2024 à 08:19
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `wisenkap`
--

-- --------------------------------------------------------

--
-- Structure de la table `abonnements`
--

DROP TABLE IF EXISTS `abonnements`;
CREATE TABLE IF NOT EXISTS `abonnements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `alerts`
--

DROP TABLE IF EXISTS `alerts`;
CREATE TABLE IF NOT EXISTS `alerts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` varchar(5) NOT NULL,
  `comment` text,
  `userId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `budgets`
--

DROP TABLE IF EXISTS `budgets`;
CREATE TABLE IF NOT EXISTS `budgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `budgets`
--

INSERT INTO `budgets` (`id`, `category`, `amount`, `userId`, `createdAt`, `updatedAt`) VALUES
(23, 'Th', -5168.00, 1, '2024-06-06 23:21:06', '2024-06-06 23:48:58'),
(22, 'Blj', 12000.00, 3, '2024-06-06 16:15:04', '2024-06-06 16:15:04'),
(21, 'Yo', -4500.00, 3, '2024-06-06 16:04:45', '2024-06-06 16:24:02'),
(20, 'Yo', -71258.00, 1, '2024-06-06 15:18:53', '2024-06-06 23:20:33');

-- --------------------------------------------------------

--
-- Structure de la table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `budgetId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `budgetId` (`budgetId`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `expenses`
--

INSERT INTO `expenses` (`id`, `category`, `amount`, `budgetId`, `createdAt`, `updatedAt`) VALUES
(66, 'Sport', 0.00, 23, '2024-06-06 23:21:09', '2024-06-06 23:21:09'),
(65, 'Nourriture', 0.00, 23, '2024-06-06 23:21:09', '2024-06-06 23:21:09'),
(64, 'Téléphone', 100.00, 23, '2024-06-06 23:21:09', '2024-06-06 23:21:09'),
(63, 'Internet', 5000.00, 23, '2024-06-06 23:21:09', '2024-06-06 23:21:09'),
(62, 'Loyer', 1000.00, 23, '2024-06-06 23:21:09', '2024-06-06 23:21:09'),
(61, 'Sport', 0.00, 22, '2024-06-06 16:15:07', '2024-06-06 16:15:07'),
(60, 'Nourriture', 0.00, 22, '2024-06-06 16:15:07', '2024-06-06 16:15:07'),
(59, 'Téléphone', 100.00, 22, '2024-06-06 16:15:07', '2024-06-06 16:15:07'),
(58, 'Internet', 5000.00, 22, '2024-06-06 16:15:07', '2024-06-06 16:15:07'),
(57, 'Loyer', 1000.00, 22, '2024-06-06 16:15:07', '2024-06-06 16:15:07'),
(56, 'Sport', 1200.00, 21, '2024-06-06 16:04:52', '2024-06-06 16:04:52'),
(55, 'Nourriture', 0.00, 21, '2024-06-06 16:04:52', '2024-06-06 16:04:52'),
(54, 'Téléphone', 100.00, 21, '2024-06-06 16:04:52', '2024-06-06 16:04:52'),
(53, 'Internet', 5000.00, 21, '2024-06-06 16:04:52', '2024-06-06 16:04:52'),
(52, 'Loyer', 10000.00, 21, '2024-06-06 16:04:52', '2024-06-06 16:04:52'),
(51, 'Yo', 1200.00, 20, '2024-06-06 15:19:57', '2024-06-06 15:19:57'),
(50, 'Sport', 1000.00, 20, '2024-06-06 15:19:57', '2024-06-06 15:19:57'),
(49, 'Nourriture', 1500.00, 20, '2024-06-06 15:19:57', '2024-06-06 15:19:57'),
(48, 'Téléphone', 100.00, 20, '2024-06-06 15:19:57', '2024-06-06 15:19:57'),
(47, 'Internet', 5000.00, 20, '2024-06-06 15:19:57', '2024-06-06 15:19:57'),
(46, 'Loyer', 1000.00, 20, '2024-06-06 15:19:57', '2024-06-06 15:19:57');

-- --------------------------------------------------------

--
-- Structure de la table `periods`
--

DROP TABLE IF EXISTS `periods`;
CREATE TABLE IF NOT EXISTS `periods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `period` varchar(50) NOT NULL,
  `startDate` varchar(50) NOT NULL,
  `budgetId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `budgetId` (`budgetId`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `periods`
--

INSERT INTO `periods` (`id`, `period`, `startDate`, `budgetId`, `createdAt`, `updatedAt`) VALUES
(17, 'semaine', 'Samedi', 23, '2024-06-06 23:21:06', '2024-06-06 23:21:06'),
(16, 'semaine', 'Samedi', 22, '2024-06-06 16:15:04', '2024-06-06 16:15:04'),
(15, 'semaine', 'Jeudi', 21, '2024-06-06 16:04:45', '2024-06-06 16:04:45'),
(14, 'semaine', '', 20, '2024-06-06 15:18:53', '2024-06-06 15:18:53');

-- --------------------------------------------------------

--
-- Structure de la table `revenus`
--

DROP TABLE IF EXISTS `revenus`;
CREATE TABLE IF NOT EXISTS `revenus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `userId` int DEFAULT NULL,
  `budgetId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `budgetId` (`budgetId`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `revenus`
--

INSERT INTO `revenus` (`id`, `type`, `amount`, `userId`, `budgetId`, `createdAt`, `updatedAt`) VALUES
(31, 'immobilier', 500.00, 1, 23, '2024-06-06 23:21:06', '2024-06-06 23:21:06'),
(30, 'immobilier', 12000.00, 3, 22, '2024-06-06 16:15:04', '2024-06-06 16:15:04'),
(29, 'immobilier', 12000.00, 3, 21, '2024-06-06 16:04:45', '2024-06-06 16:04:45'),
(28, 'autres', 15000.00, 1, 20, '2024-06-06 15:18:53', '2024-06-06 15:18:53'),
(27, 'investissement', 15000.00, 1, 20, '2024-06-06 15:18:53', '2024-06-06 15:18:53'),
(26, 'immobilier', 12000.00, 1, 20, '2024-06-06 15:18:53', '2024-06-06 15:18:53');

-- --------------------------------------------------------

--
-- Structure de la table `savings`
--

DROP TABLE IF EXISTS `savings`;
CREATE TABLE IF NOT EXISTS `savings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `budgetId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `budgetId` (`budgetId`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `savings`
--

INSERT INTO `savings` (`id`, `amount`, `date`, `budgetId`, `createdAt`, `updatedAt`) VALUES
(4, 2000.00, '2024-06-06', 20, '2024-06-06 16:31:26', '2024-06-06 16:31:26'),
(3, 1200.00, '2024-06-06', 20, '2024-06-06 16:30:25', '2024-06-06 16:30:25'),
(5, 80000.00, '2024-06-06', 20, '2024-06-06 16:32:22', '2024-06-06 16:32:22'),
(6, 200.00, '2024-06-06', 20, '2024-06-06 19:35:26', '2024-06-06 19:35:26'),
(7, 20000.00, '2024-06-06', 20, '2024-06-06 19:35:33', '2024-06-06 19:35:33'),
(8, 58.00, '2024-06-06', 20, '2024-06-06 23:20:33', '2024-06-06 23:20:33'),
(9, 500.00, '2024-06-06', 23, '2024-06-06 23:24:54', '2024-06-06 23:24:54'),
(10, 68.00, '2024-06-06', 23, '2024-06-06 23:48:58', '2024-06-06 23:48:58');

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `budgetId` int NOT NULL,
  `comment` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `budgetId` (`budgetId`)
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `category`, `amount`, `budgetId`, `comment`, `createdAt`, `updatedAt`) VALUES
(17, 'Téléphone', 100.00, 21, NULL, '2024-06-06 16:05:29', '2024-06-06 16:05:29'),
(16, 'Nourriture', 0.00, 21, NULL, '2024-06-06 16:05:29', '2024-06-06 16:05:29'),
(15, 'Sport', 1200.00, 21, NULL, '2024-06-06 16:05:29', '2024-06-06 16:05:29'),
(14, 'Téléphone', 100.00, 20, NULL, '2024-06-06 15:59:55', '2024-06-06 15:59:55'),
(13, 'Nourriture', 1500.00, 20, NULL, '2024-06-06 15:59:55', '2024-06-06 15:59:55'),
(12, 'Sport', 1000.00, 20, NULL, '2024-06-06 15:59:55', '2024-06-06 15:59:55'),
(11, 'Autre', 200.00, 20, '12', '2024-06-06 15:52:50', '2024-06-06 15:52:50'),
(10, 'Sport', 1000.00, 20, NULL, '2024-06-06 15:52:50', '2024-06-06 15:52:50'),
(18, 'Internet', 5000.00, 21, NULL, '2024-06-06 16:05:29', '2024-06-06 16:05:29'),
(19, 'Loyer', 10000.00, 21, NULL, '2024-06-06 16:05:29', '2024-06-06 16:05:29'),
(20, 'Sport', 1200.00, 21, NULL, '2024-06-06 16:20:33', '2024-06-06 16:20:33'),
(21, 'Nourriture', 0.00, 21, NULL, '2024-06-06 16:20:33', '2024-06-06 16:20:33'),
(22, 'Téléphone', 100.00, 21, NULL, '2024-06-06 16:20:33', '2024-06-06 16:20:33'),
(23, 'Internet', 5000.00, 21, NULL, '2024-06-06 16:20:33', '2024-06-06 16:20:33'),
(24, 'Sport', 1200.00, 21, NULL, '2024-06-06 16:20:57', '2024-06-06 16:20:57'),
(25, 'Nourriture', 0.00, 21, NULL, '2024-06-06 16:20:57', '2024-06-06 16:20:57'),
(26, 'Téléphone', 100.00, 21, NULL, '2024-06-06 16:20:57', '2024-06-06 16:20:57'),
(27, 'Internet', 5000.00, 21, NULL, '2024-06-06 16:20:57', '2024-06-06 16:20:57'),
(28, 'Loyer', 10000.00, 21, NULL, '2024-06-06 16:20:57', '2024-06-06 16:20:57'),
(29, 'Yo', 1200.00, 20, NULL, '2024-06-06 16:22:42', '2024-06-06 16:22:42'),
(30, 'Sport', 1000.00, 20, NULL, '2024-06-06 16:22:42', '2024-06-06 16:22:42'),
(31, 'Nourriture', 1500.00, 20, NULL, '2024-06-06 16:22:42', '2024-06-06 16:22:42'),
(32, 'Téléphone', 100.00, 20, NULL, '2024-06-06 16:22:42', '2024-06-06 16:22:42'),
(33, 'Internet', 5000.00, 20, NULL, '2024-06-06 16:22:42', '2024-06-06 16:22:42'),
(34, 'Loyer', 1000.00, 20, NULL, '2024-06-06 16:22:42', '2024-06-06 16:22:42'),
(35, 'Autre', 1200.00, 20, NULL, '2024-06-06 16:22:42', '2024-06-06 16:22:42'),
(36, 'Sport', 1200.00, 21, NULL, '2024-06-06 16:24:02', '2024-06-06 16:24:02'),
(37, 'Nourriture', 0.00, 21, NULL, '2024-06-06 16:24:02', '2024-06-06 16:24:02'),
(38, 'Téléphone', 100.00, 21, NULL, '2024-06-06 16:24:02', '2024-06-06 16:24:02'),
(39, 'Internet', 5000.00, 21, NULL, '2024-06-06 16:24:02', '2024-06-06 16:24:02'),
(40, 'Loyer', 10000.00, 21, NULL, '2024-06-06 16:24:02', '2024-06-06 16:24:02'),
(41, 'Autre', 200.00, 21, NULL, '2024-06-06 16:24:02', '2024-06-06 16:24:02'),
(42, 'Téléphone', 100.00, 23, '', '2024-06-06 23:36:09', '2024-06-06 23:36:09'),
(43, 'Internet', 5000.00, 23, '', '2024-06-06 23:36:09', '2024-06-06 23:36:09');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `postalCode` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `phone`, `firstName`, `gender`, `dob`, `country`, `postalCode`, `created_at`, `updated_at`) VALUES
(1, 'N@gmail.com', '$2a$10$RTlrajPjCaXIzDIsWelQTu31VUhOvgvKygIMAjoUHlk9.Jk.fT9J6', '65', 'Uo', 'Masculin', '2000-01-16', 'Yohyuyti', 'Uoyy', '2024-06-04 17:19:33', '2024-06-06 11:05:39'),
(2, 'yo@gmail.com', '$2a$10$i4DskW9tlAa6yrxpOSht6.AVKgRWUtaf1fWq2Px9zzolU7ZegGTVu', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 07:53:21', '2024-06-06 07:53:21'),
(3, 'N@gmail.comm', '$2a$10$f1eaFsFJjLo9AYX2jqgfGugJYvQn8CJeNy6nWajiBZEmM77VCLQhe', '', 'Nexus', '', '2024-06-06', '', '', '2024-06-06 09:27:15', '2024-06-06 16:04:28');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
