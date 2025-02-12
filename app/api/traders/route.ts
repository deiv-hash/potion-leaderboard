import { NextResponse } from "next/server";
import { Trader } from "@/app/types/trader";

// Mock data for different time frames
const tradersData = {
  daily: [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CKYES",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 158,
      winRate: 75.8,
      tradesCount: { buy: 58, sell: 52 },
      avgBuy: { solAmount: 18.2, usdAmount: 1820 },
      avgEntry: 92000,
      avgHold: 330,
      realizedPnl: { solAmount: 28.5, usdAmount: 2850 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "H8DkwdZb48RghqGX5Rzt7GHxnKzRxkUTQGjCqBGy8xKE",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 125,
      winRate: 78.5,
      tradesCount: { buy: 45, sell: 38 },
      avgBuy: { solAmount: 15.8, usdAmount: 1580 },
      avgEntry: 95000,
      avgHold: 150,
      realizedPnl: { solAmount: 24.8, usdAmount: 2480 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9pzZGfgpRWPyQvZr7kGxXnxWqBXdKTG7BtYAGtPYQ5",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 98,
      winRate: 82.3,
      tradesCount: { buy: 32, sell: 29 },
      avgBuy: { solAmount: 12.4, usdAmount: 1240 },
      avgEntry: 88000,
      avgHold: 72,
      realizedPnl: { solAmount: 19.6, usdAmount: 1960 },
    },
    {
      id: "4",
      name: "David Kim",
      wallet: "RxKp2qpCJPvzxs5QDN5qNzaWxUxvjJvxM8M5B3VfWo4c",
      image: "/avatar.jpg",
      rank: 4,
      xFollowers: 7500,
      xTag: "@davidkim",
      tokensTraded: 145,
      winRate: 71.2,
      tradesCount: { buy: 48, sell: 42 },
      avgBuy: { solAmount: 14.5, usdAmount: 1450 },
      avgEntry: 89000,
      avgHold: 180,
      realizedPnl: { solAmount: 18.2, usdAmount: 1820 },
    },
    {
      id: "5",
      name: "Emma Wilson",
      wallet: "TzNkqeJXNyxbQqBtQ8qN4RcghyPqmkDwRkHXP2R1Qx4B",
      image: "/avatar.jpg",
      rank: 5,
      xFollowers: 6800,
      xTag: "@emmawilson",
      tokensTraded: 112,
      winRate: 76.8,
      tradesCount: { buy: 38, sell: 35 },
      avgBuy: { solAmount: 13.2, usdAmount: 1320 },
      avgEntry: 91000,
      avgHold: 120,
      realizedPnl: { solAmount: 16.5, usdAmount: 1650 },
    },
    {
      id: "6",
      name: "James Lee",
      wallet: "WyHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL7Px9Yz",
      image: "/avatar.jpg",
      rank: 6,
      xFollowers: 5900,
      xTag: "@jameslee",
      tokensTraded: 95,
      winRate: 73.5,
      tradesCount: { buy: 30, sell: 28 },
      avgBuy: { solAmount: 11.8, usdAmount: 1180 },
      avgEntry: 87000,
      avgHold: 90,
      realizedPnl: { solAmount: 14.8, usdAmount: 1480 },
    },
    {
      id: "7",
      name: "Sofia Garcia",
      wallet: "LmNkHJp6Q1xBnQqPx9pZMwE8Q9v2t7kGpR4VNwmL7Qx3",
      image: "/avatar.jpg",
      rank: 7,
      xFollowers: 5200,
      xTag: "@sofiagarcia",
      tokensTraded: 88,
      winRate: 79.2,
      tradesCount: { buy: 28, sell: 25 },
      avgBuy: { solAmount: 10.5, usdAmount: 1050 },
      avgEntry: 86000,
      avgHold: 60,
      realizedPnl: { solAmount: 13.2, usdAmount: 1320 },
    },
    {
      id: "8",
      name: "Lucas Brown",
      wallet: "VnHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL8Hz5Y",
      image: "/avatar.jpg",
      rank: 8,
      xFollowers: 4800,
      xTag: "@lucasbrown",
      tokensTraded: 82,
      winRate: 74.8,
      tradesCount: { buy: 25, sell: 22 },
      avgBuy: { solAmount: 9.8, usdAmount: 980 },
      avgEntry: 85000,
      avgHold: 45,
      realizedPnl: { solAmount: 11.5, usdAmount: 1150 },
    },
    {
      id: "9",
      name: "Olivia Taylor",
      wallet: "JkHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL4Yz7W",
      image: "/avatar.jpg",
      rank: 9,
      xFollowers: 4200,
      xTag: "@oliviataylor",
      tokensTraded: 75,
      winRate: 77.5,
      tradesCount: { buy: 22, sell: 20 },
      avgBuy: { solAmount: 8.9, usdAmount: 890 },
      avgEntry: 84000,
      avgHold: 30,
      realizedPnl: { solAmount: 10.2, usdAmount: 1020 },
    },
    {
      id: "10",
      name: "Daniel Park",
      wallet: "BhHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL6Wx8Z",
      image: "/avatar.jpg",
      rank: 10,
      xFollowers: 3800,
      xTag: "@danielpark",
      tokensTraded: 68,
      winRate: 72.8,
      tradesCount: { buy: 20, sell: 18 },
      avgBuy: { solAmount: 8.2, usdAmount: 820 },
      avgEntry: 83000,
      avgHold: 25,
      realizedPnl: { solAmount: 9.5, usdAmount: 950 },
    },
  ],
  weekly: [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CKYES",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 980,
      winRate: 73.4,
      tradesCount: { buy: 380, sell: 340 },
      avgBuy: { solAmount: 19.5, usdAmount: 1950 },
      avgEntry: 91000,
      avgHold: 360,
      realizedPnl: { solAmount: 186.5, usdAmount: 18650 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "H8DkwdZb48RghqGX5Rzt7GHxnKzRxkUTQGjCqBGy8xKE",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 850,
      winRate: 76.2,
      tradesCount: { buy: 320, sell: 280 },
      avgBuy: { solAmount: 16.2, usdAmount: 1620 },
      avgEntry: 94000,
      avgHold: 180,
      realizedPnl: { solAmount: 156.8, usdAmount: 15680 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9pzZGfgpRWPyQvZr7kGxXnxWqBXdKTG7BtYAGtPYQ5",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 620,
      winRate: 80.5,
      tradesCount: { buy: 240, sell: 210 },
      avgBuy: { solAmount: 13.1, usdAmount: 1310 },
      avgEntry: 87000,
      avgHold: 90,
      realizedPnl: { solAmount: 142.6, usdAmount: 14260 },
    },
    {
      id: "4",
      name: "David Kim",
      wallet: "RxKp2qpCJPvzxs5QDN5qNzaWxUxvjJvxM8M5B3VfWo4c",
      image: "/avatar.jpg",
      rank: 4,
      xFollowers: 7500,
      xTag: "@davidkim",
      tokensTraded: 580,
      winRate: 72.5,
      tradesCount: { buy: 220, sell: 190 },
      avgBuy: { solAmount: 15.2, usdAmount: 1520 },
      avgEntry: 89000,
      avgHold: 200,
      realizedPnl: { solAmount: 128.4, usdAmount: 12840 },
    },
    {
      id: "5",
      name: "Emma Wilson",
      wallet: "TzNkqeJXNyxbQqBtQ8qN4RcghyPqmkDwRkHXP2R1Qx4B",
      image: "/avatar.jpg",
      rank: 5,
      xFollowers: 6800,
      xTag: "@emmawilson",
      tokensTraded: 520,
      winRate: 75.8,
      tradesCount: { buy: 200, sell: 180 },
      avgBuy: { solAmount: 14.1, usdAmount: 1410 },
      avgEntry: 91000,
      avgHold: 150,
      realizedPnl: { solAmount: 115.2, usdAmount: 11520 },
    },
    {
      id: "6",
      name: "James Lee",
      wallet: "WyHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL7Px9Yz",
      image: "/avatar.jpg",
      rank: 6,
      xFollowers: 5900,
      xTag: "@jameslee",
      tokensTraded: 480,
      winRate: 74.2,
      tradesCount: { buy: 180, sell: 160 },
      avgBuy: { solAmount: 12.8, usdAmount: 1280 },
      avgEntry: 87000,
      avgHold: 120,
      realizedPnl: { solAmount: 98.5, usdAmount: 9850 },
    },
    {
      id: "7",
      name: "Sofia Garcia",
      wallet: "LmNkHJp6Q1xBnQqPx9pZMwE8Q9v2t7kGpR4VNwmL7Qx3",
      image: "/avatar.jpg",
      rank: 7,
      xFollowers: 5200,
      xTag: "@sofiagarcia",
      tokensTraded: 420,
      winRate: 78.5,
      tradesCount: { buy: 160, sell: 140 },
      avgBuy: { solAmount: 11.5, usdAmount: 1150 },
      avgEntry: 86000,
      avgHold: 100,
      realizedPnl: { solAmount: 85.6, usdAmount: 8560 },
    },
    {
      id: "8",
      name: "Lucas Brown",
      wallet: "VnHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL8Hz5Y",
      image: "/avatar.jpg",
      rank: 8,
      xFollowers: 4800,
      xTag: "@lucasbrown",
      tokensTraded: 380,
      winRate: 73.8,
      tradesCount: { buy: 140, sell: 120 },
      avgBuy: { solAmount: 10.2, usdAmount: 1020 },
      avgEntry: 85000,
      avgHold: 80,
      realizedPnl: { solAmount: 72.4, usdAmount: 7240 },
    },
    {
      id: "9",
      name: "Olivia Taylor",
      wallet: "JkHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL4Yz7W",
      image: "/avatar.jpg",
      rank: 9,
      xFollowers: 4200,
      xTag: "@oliviataylor",
      tokensTraded: 320,
      winRate: 76.8,
      tradesCount: { buy: 120, sell: 100 },
      avgBuy: { solAmount: 9.5, usdAmount: 950 },
      avgEntry: 84000,
      avgHold: 60,
      realizedPnl: { solAmount: 65.8, usdAmount: 6580 },
    },
    {
      id: "10",
      name: "Daniel Park",
      wallet: "BhHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL6Wx8Z",
      image: "/avatar.jpg",
      rank: 10,
      xFollowers: 3800,
      xTag: "@danielpark",
      tokensTraded: 280,
      winRate: 71.5,
      tradesCount: { buy: 100, sell: 90 },
      avgBuy: { solAmount: 8.8, usdAmount: 880 },
      avgEntry: 83000,
      avgHold: 45,
      realizedPnl: { solAmount: 58.2, usdAmount: 5820 },
    },
  ],
  monthly: [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CKYES",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 4200,
      winRate: 72.6,
      tradesCount: { buy: 1580, sell: 1420 },
      avgBuy: { solAmount: 20.2, usdAmount: 2020 },
      avgEntry: 90000,
      avgHold: 380,
      realizedPnl: { solAmount: 786.5, usdAmount: 78650 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "H8DkwdZb48RghqGX5Rzt7GHxnKzRxkUTQGjCqBGy8xKE",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 3600,
      winRate: 75.8,
      tradesCount: { buy: 1250, sell: 1100 },
      avgBuy: { solAmount: 16.8, usdAmount: 1680 },
      avgEntry: 93000,
      avgHold: 200,
      realizedPnl: { solAmount: 685.8, usdAmount: 68580 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9pzZGfgpRWPyQvZr7kGxXnxWqBXdKTG7BtYAGtPYQ5",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 2800,
      winRate: 79.2,
      tradesCount: { buy: 980, sell: 850 },
      avgBuy: { solAmount: 13.8, usdAmount: 1380 },
      avgEntry: 86000,
      avgHold: 110,
      realizedPnl: { solAmount: 598.6, usdAmount: 59860 },
    },
    {
      id: "4",
      name: "David Kim",
      wallet: "RxKp2qpCJPvzxs5QDN5qNzaWxUxvjJvxM8M5B3VfWo4c",
      image: "/avatar.jpg",
      rank: 4,
      xFollowers: 7500,
      xTag: "@davidkim",
      tokensTraded: 2400,
      winRate: 71.8,
      tradesCount: { buy: 850, sell: 750 },
      avgBuy: { solAmount: 15.5, usdAmount: 1550 },
      avgEntry: 89000,
      avgHold: 220,
      realizedPnl: { solAmount: 524.2, usdAmount: 52420 },
    },
    {
      id: "5",
      name: "Emma Wilson",
      wallet: "TzNkqeJXNyxbQqBtQ8qN4RcghyPqmkDwRkHXP2R1Qx4B",
      image: "/avatar.jpg",
      rank: 5,
      xFollowers: 6800,
      xTag: "@emmawilson",
      tokensTraded: 2200,
      winRate: 74.5,
      tradesCount: { buy: 780, sell: 680 },
      avgBuy: { solAmount: 14.8, usdAmount: 1480 },
      avgEntry: 91000,
      avgHold: 180,
      realizedPnl: { solAmount: 468.5, usdAmount: 46850 },
    },
    {
      id: "6",
      name: "James Lee",
      wallet: "WyHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL7Px9Yz",
      image: "/avatar.jpg",
      rank: 6,
      xFollowers: 5900,
      xTag: "@jameslee",
      tokensTraded: 1900,
      winRate: 73.2,
      tradesCount: { buy: 680, sell: 580 },
      avgBuy: { solAmount: 13.2, usdAmount: 1320 },
      avgEntry: 87000,
      avgHold: 150,
      realizedPnl: { solAmount: 385.6, usdAmount: 38560 },
    },
    {
      id: "7",
      name: "Sofia Garcia",
      wallet: "LmNkHJp6Q1xBnQqPx9pZMwE8Q9v2t7kGpR4VNwmL7Qx3",
      image: "/avatar.jpg",
      rank: 7,
      xFollowers: 5200,
      xTag: "@sofiagarcia",
      tokensTraded: 1700,
      winRate: 77.8,
      tradesCount: { buy: 580, sell: 480 },
      avgBuy: { solAmount: 12.2, usdAmount: 1220 },
      avgEntry: 86000,
      avgHold: 130,
      realizedPnl: { solAmount: 342.8, usdAmount: 34280 },
    },
    {
      id: "8",
      name: "Lucas Brown",
      wallet: "VnHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL8Hz5Y",
      image: "/avatar.jpg",
      rank: 8,
      xFollowers: 4800,
      xTag: "@lucasbrown",
      tokensTraded: 1500,
      winRate: 72.5,
      tradesCount: { buy: 480, sell: 380 },
      avgBuy: { solAmount: 11.5, usdAmount: 1150 },
      avgEntry: 85000,
      avgHold: 100,
      realizedPnl: { solAmount: 285.4, usdAmount: 28540 },
    },
    {
      id: "9",
      name: "Olivia Taylor",
      wallet: "JkHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL4Yz7W",
      image: "/avatar.jpg",
      rank: 9,
      xFollowers: 4200,
      xTag: "@oliviataylor",
      tokensTraded: 1300,
      winRate: 75.8,
      tradesCount: { buy: 380, sell: 280 },
      avgBuy: { solAmount: 10.8, usdAmount: 1080 },
      avgEntry: 84000,
      avgHold: 80,
      realizedPnl: { solAmount: 245.2, usdAmount: 24520 },
    },
    {
      id: "10",
      name: "Daniel Park",
      wallet: "BhHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL6Wx8Z",
      image: "/avatar.jpg",
      rank: 10,
      xFollowers: 3800,
      xTag: "@danielpark",
      tokensTraded: 1100,
      winRate: 70.5,
      tradesCount: { buy: 280, sell: 180 },
      avgBuy: { solAmount: 9.8, usdAmount: 980 },
      avgEntry: 83000,
      avgHold: 60,
      realizedPnl: { solAmount: 198.6, usdAmount: 19860 },
    },
  ],
  "all-time": [
    {
      id: "3",
      name: "Mike Rodriguez",
      wallet: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CKYES",
      image: "/avatar.jpg",
      rank: 1,
      xFollowers: 15200,
      xTag: "@mrodriguez",
      tokensTraded: 15800,
      winRate: 71.2,
      tradesCount: { buy: 5800, sell: 5200 },
      avgBuy: { solAmount: 21.0, usdAmount: 2100 },
      avgEntry: 89000,
      avgHold: 400,
      realizedPnl: { solAmount: 2865.0, usdAmount: 286500 },
    },
    {
      id: "1",
      name: "Alex Thompson",
      wallet: "H8DkwdZb48RghqGX5Rzt7GHxnKzRxkUTQGjCqBGy8xKE",
      image: "/avatar.jpg",
      rank: 2,
      xFollowers: 12500,
      xTag: "@alexthompson",
      tokensTraded: 12500,
      winRate: 74.5,
      tradesCount: { buy: 4500, sell: 3800 },
      avgBuy: { solAmount: 17.2, usdAmount: 1720 },
      avgEntry: 92000,
      avgHold: 220,
      realizedPnl: { solAmount: 2458.0, usdAmount: 245800 },
    },
    {
      id: "2",
      name: "Sarah Chen",
      wallet: "Kp9pzZGfgpRWPyQvZr7kGxXnxWqBXdKTG7BtYAGtPYQ5",
      image: "/avatar.jpg",
      rank: 3,
      xFollowers: 8900,
      xTag: "@sarahchen",
      tokensTraded: 9800,
      winRate: 77.8,
      tradesCount: { buy: 3200, sell: 2900 },
      avgBuy: { solAmount: 14.2, usdAmount: 1420 },
      avgEntry: 85000,
      avgHold: 130,
      realizedPnl: { solAmount: 1986.0, usdAmount: 198600 },
    },
    {
      id: "4",
      name: "David Kim",
      wallet: "RxKp2qpCJPvzxs5QDN5qNzaWxUxvjJvxM8M5B3VfWo4c",
      image: "/avatar.jpg",
      rank: 4,
      xFollowers: 7500,
      xTag: "@davidkim",
      tokensTraded: 8500,
      winRate: 70.5,
      tradesCount: { buy: 2800, sell: 2500 },
      avgBuy: { solAmount: 16.0, usdAmount: 1600 },
      avgEntry: 89000,
      avgHold: 250,
      realizedPnl: { solAmount: 1685.0, usdAmount: 168500 },
    },
    {
      id: "5",
      name: "Emma Wilson",
      wallet: "TzNkqeJXNyxbQqBtQ8qN4RcghyPqmkDwRkHXP2R1Qx4B",
      image: "/avatar.jpg",
      rank: 5,
      xFollowers: 6800,
      xTag: "@emmawilson",
      tokensTraded: 7200,
      winRate: 73.8,
      tradesCount: { buy: 2400, sell: 2100 },
      avgBuy: { solAmount: 15.2, usdAmount: 1520 },
      avgEntry: 91000,
      avgHold: 200,
      realizedPnl: { solAmount: 1425.0, usdAmount: 142500 },
    },
    {
      id: "6",
      name: "James Lee",
      wallet: "WyHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL7Px9Yz",
      image: "/avatar.jpg",
      rank: 6,
      xFollowers: 5900,
      xTag: "@jameslee",
      tokensTraded: 6500,
      winRate: 72.5,
      tradesCount: { buy: 2200, sell: 1900 },
      avgBuy: { solAmount: 13.8, usdAmount: 1380 },
      avgEntry: 87000,
      avgHold: 180,
      realizedPnl: { solAmount: 1250.0, usdAmount: 125000 },
    },
    {
      id: "7",
      name: "Sofia Garcia",
      wallet: "LmNkHJp6Q1xBnQqPx9pZMwE8Q9v2t7kGpR4VNwmL7Qx3",
      image: "/avatar.jpg",
      rank: 7,
      xFollowers: 5200,
      xTag: "@sofiagarcia",
      tokensTraded: 5800,
      winRate: 76.5,
      tradesCount: { buy: 1900, sell: 1600 },
      avgBuy: { solAmount: 12.5, usdAmount: 1250 },
      avgEntry: 86000,
      avgHold: 150,
      realizedPnl: { solAmount: 985.0, usdAmount: 98500 },
    },
    {
      id: "8",
      name: "Lucas Brown",
      wallet: "VnHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL8Hz5Y",
      image: "/avatar.jpg",
      rank: 8,
      xFollowers: 4800,
      xTag: "@lucasbrown",
      tokensTraded: 5200,
      winRate: 71.8,
      tradesCount: { buy: 1600, sell: 1300 },
      avgBuy: { solAmount: 11.8, usdAmount: 1180 },
      avgEntry: 85000,
      avgHold: 120,
      realizedPnl: { solAmount: 865.0, usdAmount: 86500 },
    },
    {
      id: "9",
      name: "Olivia Taylor",
      wallet: "JkHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL4Yz7W",
      image: "/avatar.jpg",
      rank: 9,
      xFollowers: 4200,
      xTag: "@oliviataylor",
      tokensTraded: 4500,
      winRate: 74.8,
      tradesCount: { buy: 1300, sell: 1000 },
      avgBuy: { solAmount: 11.2, usdAmount: 1120 },
      avgEntry: 84000,
      avgHold: 100,
      realizedPnl: { solAmount: 725.0, usdAmount: 72500 },
    },
    {
      id: "10",
      name: "Daniel Park",
      wallet: "BhHKxBN4Q7nJqPx9pZMwE8Q9v2t7kGpR4VNwmL6Wx8Z",
      image: "/avatar.jpg",
      rank: 10,
      xFollowers: 3800,
      xTag: "@danielpark",
      tokensTraded: 3800,
      winRate: 69.5,
      tradesCount: { buy: 1000, sell: 700 },
      avgBuy: { solAmount: 10.5, usdAmount: 1050 },
      avgEntry: 83000,
      avgHold: 80,
      realizedPnl: { solAmount: 585.0, usdAmount: 58500 },
    },
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get time frame from query params, default to daily
  const timeFrame = (searchParams.get("timeFrame") ||
    "daily") as keyof typeof tradersData;
  const sortBy = searchParams.get("sortBy") || "rank";
  const sortDirection = searchParams.get("sortDirection") || "asc";

  let traders = [...tradersData[timeFrame]];

  //apply search filter
  const search = searchParams.get("search")?.toLocaleLowerCase();
  if (search) {
    traders = traders.filter(
      (trader) =>
        trader.name.toLocaleLowerCase().includes(search) ||
        trader.wallet.toLocaleLowerCase().includes(search)
    );
  }

  // Apply range filters
  const applyRangeFilter = (value: number, min?: string, max?: string) => {
    if (min && value < Number(min)) return false;
    if (max && value > Number(max)) return false;
    return true;
  };

  // Followers range
  const xFollowersMin = searchParams.get("xFollowersMin") || undefined;
  const xFollowersMax = searchParams.get("xFollowersMax") || undefined;
  if (xFollowersMin || xFollowersMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.xFollowers, xFollowersMin, xFollowersMax)
    );
  }

  // Tokens range
  const tokensMin = searchParams.get("tokensMin") || undefined;
  const tokensMax = searchParams.get("tokensMax") || undefined;
  if (tokensMin || tokensMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.tokensTraded, tokensMin, tokensMax)
    );
  }

  // Win rate range
  const winRateMin = searchParams.get("winRateMin") || undefined;
  const winRateMax = searchParams.get("winRateMax") || undefined;
  if (winRateMin || winRateMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.winRate, winRateMin, winRateMax)
    );
  }

  // Trades count range
  const tradesMin = searchParams.get("tradesMin") || undefined;
  const tradesMax = searchParams.get("tradesMax") || undefined;
  if (tradesMin || tradesMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(
        trader.tradesCount.buy + trader.tradesCount.sell,
        tradesMin,
        tradesMax
      )
    );
  }

  // Average buy range
  const avgBuyMin = searchParams.get("avgBuyMin") || undefined;
  const avgBuyMax = searchParams.get("avgBuyMax") || undefined;
  if (avgBuyMin || avgBuyMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.avgBuy.solAmount, avgBuyMin, avgBuyMax)
    );
  }

  // Average entry range
  const avgEntryMin = searchParams.get("avgEntryMin") || undefined;
  const avgEntryMax = searchParams.get("avgEntryMax") || undefined;
  if (avgEntryMin || avgEntryMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.avgEntry, avgEntryMin, avgEntryMax)
    );
  }

  // Average hold range
  const avgHoldMin = searchParams.get("avgHoldMin") || undefined;
  const avgHoldMax = searchParams.get("avgHoldMax") || undefined;
  if (avgHoldMin || avgHoldMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(trader.avgHold, avgHoldMin, avgHoldMax)
    );
  }

  // Realized PnL range
  const realizedPnlMin = searchParams.get("realizedPnlMin") || undefined;
  const realizedPnlMax = searchParams.get("realizedPnlMax") || undefined;
  if (realizedPnlMin || realizedPnlMax) {
    traders = traders.filter((trader) =>
      applyRangeFilter(
        trader.realizedPnl.solAmount,
        realizedPnlMin,
        realizedPnlMax
      )
    );
  }

  // Apply sort
  traders.sort((a: Trader, b: Trader) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    // Special handling for tradesCount
    if (sortBy === "tradesCount") {
      const aTotal = a.tradesCount.buy + a.tradesCount.sell;
      const bTotal = b.tradesCount.buy + b.tradesCount.sell;
      return (aTotal - bTotal) * multiplier;
    }

    // Special handling for avgBuy
    if (sortBy === "avgBuy") {
      const aValue = a.avgBuy.solAmount;
      const bValue = b.avgBuy.solAmount;
      return (aValue - bValue) * multiplier;
    }

    // Special handling for realizedPnl
    if (sortBy === "realizedPnl") {
      const aValue = a.realizedPnl.solAmount;
      const bValue = b.realizedPnl.solAmount;
      return (aValue - bValue) * multiplier;
    }

    const aValue = a[sortBy as keyof Trader] as number;
    const bValue = b[sortBy as keyof Trader] as number;
    return (aValue - bValue) * multiplier;
  });

  return NextResponse.json(traders);
}
