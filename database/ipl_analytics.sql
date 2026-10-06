-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2026 at 11:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ipl_analytics`
--

-- --------------------------------------------------------

--
-- Table structure for table `chart_over_analysis`
--

CREATE TABLE `chart_over_analysis` (
  `over_number` int(11) NOT NULL,
  `avg_runs` decimal(5,2) DEFAULT 0.00,
  `total_wickets` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chart_over_analysis`
--

INSERT INTO `chart_over_analysis` (`over_number`, `avg_runs`, `total_wickets`) VALUES
(1, 5.50, 20),
(2, 6.20, 25),
(3, 7.10, 30),
(4, 7.80, 28),
(5, 8.50, 22),
(6, 9.10, 35),
(7, 6.50, 40),
(8, 6.80, 42),
(9, 7.00, 38),
(10, 7.20, 35),
(11, 7.50, 30),
(12, 7.80, 33),
(13, 8.20, 36),
(14, 8.50, 39),
(15, 9.00, 45),
(16, 9.50, 50),
(17, 10.20, 60),
(18, 11.00, 75),
(19, 11.50, 85),
(20, 12.50, 95);

-- --------------------------------------------------------

--
-- Table structure for table `chart_runs_distribution`
--

CREATE TABLE `chart_runs_distribution` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chart_runs_distribution`
--

INSERT INTO `chart_runs_distribution` (`id`, `type`, `value`) VALUES
(1, 'Singles', 7500),
(2, 'Doubles', 3600),
(3, 'Triples', 150),
(4, 'Fours', 8400),
(5, 'Sixes', 6900);

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `match_number` int(11) NOT NULL,
  `date` date NOT NULL,
  `venue` varchar(100) NOT NULL,
  `team1_id` int(11) DEFAULT NULL,
  `team2_id` int(11) DEFAULT NULL,
  `winner_id` int(11) DEFAULT NULL,
  `team1_runs` int(11) DEFAULT 0,
  `team1_wickets` int(11) DEFAULT 0,
  `team2_runs` int(11) DEFAULT 0,
  `team2_wickets` int(11) DEFAULT 0,
  `total_fours` int(11) DEFAULT 0,
  `total_sixes` int(11) DEFAULT 0,
  `extras` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `match_number`, `date`, `venue`, `team1_id`, `team2_id`, `winner_id`, `team1_runs`, `team1_wickets`, `team2_runs`, `team2_wickets`, `total_fours`, `total_sixes`, `extras`) VALUES
(1, 1, '2026-03-20', 'Chepauk Stadium', 1, 3, 1, 200, 5, 185, 8, 30, 15, 10),
(2, 2, '2026-03-21', 'Wankhede Stadium', 2, 4, 4, 175, 7, 176, 4, 25, 12, 8),
(3, 3, '2026-03-22', 'Eden Gardens', 4, 8, 4, 210, 4, 205, 6, 35, 20, 15),
(4, 4, '2026-03-23', 'Chinnaswamy Stadium', 3, 1, 3, 195, 6, 190, 9, 28, 14, 12);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `matches` int(11) DEFAULT 0,
  `runs` int(11) DEFAULT 0,
  `wickets` int(11) DEFAULT 0,
  `strike_rate` decimal(5,2) DEFAULT 0.00,
  `fours` int(11) DEFAULT 0,
  `sixes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `team_id`, `name`, `role`, `matches`, `runs`, `wickets`, `strike_rate`, `fours`, `sixes`) VALUES
(1, 1, 'MS Dhoni', 'Wicketkeeper Batter', 14, 250, 0, 150.50, 15, 12),
(2, 1, 'Ruturaj Gaikwad', 'Batter', 14, 600, 0, 140.20, 60, 20),
(3, 2, 'Rohit Sharma', 'Batter', 14, 450, 0, 135.00, 45, 25),
(4, 2, 'Jasprit Bumrah', 'Bowler', 14, 20, 25, 100.00, 2, 0),
(5, 3, 'Virat Kohli', 'Batter', 15, 750, 0, 155.00, 80, 38),
(6, 3, 'Glenn Maxwell', 'All-rounder', 15, 400, 10, 160.00, 30, 25),
(7, 4, 'Shreyas Iyer', 'Batter', 16, 500, 0, 130.00, 40, 15),
(8, 4, 'Sunil Narine', 'All-rounder', 16, 450, 20, 170.00, 45, 30),
(9, 5, 'Rishabh Pant', 'Wicketkeeper Batter', 14, 550, 0, 145.00, 50, 25),
(10, 6, 'Sanju Samson', 'Wicketkeeper Batter', 15, 530, 0, 142.00, 55, 22),
(11, 7, 'Shikhar Dhawan', 'Batter', 14, 420, 0, 132.00, 48, 12),
(12, 8, 'Heinrich Klaasen', 'Wicketkeeper Batter', 14, 480, 0, 185.00, 30, 40),
(13, 9, 'KL Rahul', 'Wicketkeeper Batter', 14, 520, 0, 135.00, 50, 18),
(14, 10, 'Shubman Gill', 'Batter', 14, 650, 0, 145.00, 65, 22);

-- --------------------------------------------------------

--
-- Table structure for table `season_stats`
--

CREATE TABLE `season_stats` (
  `id` int(11) NOT NULL,
  `total_matches` int(11) DEFAULT 0,
  `total_overs` decimal(10,1) DEFAULT 0.0,
  `total_balls` int(11) DEFAULT 0,
  `total_runs` int(11) DEFAULT 0,
  `total_wickets` int(11) DEFAULT 0,
  `total_fours` int(11) DEFAULT 0,
  `total_sixes` int(11) DEFAULT 0,
  `total_singles` int(11) DEFAULT 0,
  `total_doubles` int(11) DEFAULT 0,
  `total_triples` int(11) DEFAULT 0,
  `total_dot_balls` int(11) DEFAULT 0,
  `total_extras` int(11) DEFAULT 0,
  `total_wides` int(11) DEFAULT 0,
  `total_no_balls` int(11) DEFAULT 0,
  `total_byes` int(11) DEFAULT 0,
  `total_leg_byes` int(11) DEFAULT 0,
  `total_overthrow_runs` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `season_stats`
--

INSERT INTO `season_stats` (`id`, `total_matches`, `total_overs`, `total_balls`, `total_runs`, `total_wickets`, `total_fours`, `total_sixes`, `total_singles`, `total_doubles`, `total_triples`, `total_dot_balls`, `total_extras`, `total_wides`, `total_no_balls`, `total_byes`, `total_leg_byes`, `total_overthrow_runs`) VALUES
(1, 74, 2900.5, 17405, 24500, 850, 2100, 1150, 7500, 1800, 50, 6000, 1200, 600, 100, 200, 250, 50);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `short_name` varchar(10) NOT NULL,
  `color_primary` varchar(20) DEFAULT NULL,
  `color_secondary` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `short_name`, `color_primary`, `color_secondary`) VALUES
(1, 'Chennai Super Kings', 'CSK', '#F9CD05', '#000000'),
(2, 'Mumbai Indians', 'MI', '#004BA0', '#D1AB3E'),
(3, 'Royal Challengers Bengaluru', 'RCB', '#EA1A2A', '#000000'),
(4, 'Kolkata Knight Riders', 'KKR', '#3A225D', '#B3A123'),
(5, 'Delhi Capitals', 'DC', '#00008B', '#FF0000'),
(6, 'Rajasthan Royals', 'RR', '#EA1A85', '#00008B'),
(7, 'Punjab Kings', 'PBKS', '#DD1F2D', '#D7C736'),
(8, 'Sunrisers Hyderabad', 'SRH', '#F26522', '#000000'),
(9, 'Lucknow Super Giants', 'LSG', '#0057E2', '#EB1B23'),
(10, 'Gujarat Titans', 'GT', '#1B2133', '#B08851');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chart_over_analysis`
--
ALTER TABLE `chart_over_analysis`
  ADD PRIMARY KEY (`over_number`);

--
-- Indexes for table `chart_runs_distribution`
--
ALTER TABLE `chart_runs_distribution`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team1_id` (`team1_id`),
  ADD KEY `team2_id` (`team2_id`),
  ADD KEY `winner_id` (`winner_id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `season_stats`
--
ALTER TABLE `season_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chart_runs_distribution`
--
ALTER TABLE `chart_runs_distribution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `season_stats`
--
ALTER TABLE `season_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team1_id`) REFERENCES `teams` (`id`),
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`team2_id`) REFERENCES `teams` (`id`),
  ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`winner_id`) REFERENCES `teams` (`id`);

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
