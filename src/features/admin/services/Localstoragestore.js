// src/features/admin/services/admin.api.js

export const LOCAL_STORAGE_KEY = "pizza_hub_admin_data_v1";

export const initialData = {
  stats: {
    totalOrdersToday: 142,
    totalOrdersChange: 12.5, // % vs yesterday
    revenueToday: 48950,
    revenueChange: 8.4,
    pendingOrders: 18,
    pendingChange: -3.2,
    totalUsers: 2845,
    usersChange: 15.0,
    revenue7Days: [
      { day: "Mon", revenue: 34200, orders: 98 },
      { day: "Tue", revenue: 38500, orders: 110 },
      { day: "Wed", revenue: 41200, orders: 118 },
      { day: "Thu", revenue: 39800, orders: 112 },
      { day: "Fri", revenue: 56400, orders: 165 },
      { day: "Sat", revenue: 68900, orders: 198 },
      { day: "Sun", revenue: 48950, orders: 142 },
    ],
  },
  popularItems: [
    {
      id: "p1",
      name: "Super Pepperoni Feast",
      category: "Pizza",
      price: 499,
      ordersCount: 384,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&auto=format&fit=crop&q=80",
      rating: 4.9,
    },
    {
      id: "p2",
      name: "Truffle Mushroom Supreme",
      category: "Pizza",
      price: 549,
      ordersCount: 298,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80",
      rating: 4.8,
    },
    {
      id: "p3",
      name: "Garlic Cheesy Stuffed Breadstick",
      category: "Sides",
      price: 199,
      ordersCount: 275,
      image:
        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300&auto=format&fit=crop&q=80",
      rating: 4.7,
    },
    {
      id: "p4",
      name: "Spicy Paneer Tikka Blast",
      category: "Pizza",
      price: 459,
      ordersCount: 242,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&auto=format&fit=crop&q=80",
      rating: 4.6,
    },
    {
      id: "p5",
      name: "Double Chocolate Lava Cake",
      category: "Desserts",
      price: 179,
      ordersCount: 219,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&auto=format&fit=crop&q=80",
      rating: 4.9,
    },
  ],
  orders: [
    {
      id: "ORD-9842",
      customerName: "Aarav Sharma",
      customerPhone: "+91 98765 43210",
      itemsCount: 3,
      itemsList: [
        { name: "Super Pepperoni Feast", size: "Large", qty: 1, price: 599 },
        {
          name: "Garlic Cheesy Stuffed Breadstick",
          size: "Regular",
          qty: 1,
          price: 199,
        },
        { name: "Chilled Mango Fizz", size: "Medium", qty: 1, price: 129 },
      ],
      deliveryAddress:
        "Flat 402, Sunshine Heights, Sector 18, Gurugram, Haryana - 122018",
      paymentId: "PAY-882319412",
      paymentMethod: "UPI (Google Pay)",
      totalAmount: 927,
      status: "Pending",
      orderTime: "10 mins ago",
      timestamp: "2026-08-04T11:46:00",
    },
    {
      id: "ORD-9841",
      customerName: "Priya Patel",
      customerPhone: "+91 98123 76543",
      itemsCount: 2,
      itemsList: [
        {
          name: "Truffle Mushroom Supreme",
          size: "Medium",
          qty: 1,
          price: 549,
        },
        {
          name: "Double Chocolate Lava Cake",
          size: "Single",
          qty: 2,
          price: 358,
        },
      ],
      deliveryAddress: "House 14, Rosewood Colony, MG Road, Bengaluru - 560001",
      paymentId: "PAY-882319300",
      paymentMethod: "Credit Card (HDFC)",
      totalAmount: 907,
      status: "Preparing",
      orderTime: "25 mins ago",
      timestamp: "2026-08-04T11:31:00",
    },
    {
      id: "ORD-9840",
      customerName: "Rohan Verma",
      customerPhone: "+91 97654 12399",
      itemsCount: 4,
      itemsList: [
        {
          name: "Spicy Paneer Tikka Blast",
          size: "Large",
          qty: 2,
          price: 1100,
        },
        { name: "Crispy Peri Peri Wings", size: "6 Pcs", qty: 1, price: 289 },
        { name: "Classic Iced Cold Coffee", size: "Large", qty: 1, price: 159 },
      ],
      deliveryAddress: "Villa 8, Palm Meadows, Whitefield, Bengaluru - 560066",
      paymentId: "PAY-882318991",
      paymentMethod: "UPI (PhonePe)",
      totalAmount: 1548,
      status: "Out for Delivery",
      orderTime: "40 mins ago",
      timestamp: "2026-08-04T11:16:00",
    },
    {
      id: "ORD-9839",
      customerName: "Sneha Reddy",
      customerPhone: "+91 99887 11223",
      itemsCount: 1,
      itemsList: [
        {
          name: "Classic Margherita Deluxe",
          size: "Medium",
          qty: 1,
          price: 379,
        },
      ],
      deliveryAddress:
        "Apartment 102, Green Glen Layout, Bellandur, Bengaluru - 560103",
      paymentId: "PAY-882318450",
      paymentMethod: "Cash on Delivery",
      totalAmount: 379,
      status: "Delivered",
      orderTime: "1 hour ago",
      timestamp: "2026-08-04T10:56:00",
    },
    {
      id: "ORD-9838",
      customerName: "Vikram Malhotra",
      customerPhone: "+91 91234 56789",
      itemsCount: 2,
      itemsList: [
        {
          name: "BBQ Smoked Chicken Special",
          size: "Large",
          qty: 1,
          price: 649,
        },
        { name: "Cheesy Dip", size: "Standard", qty: 2, price: 78 },
      ],
      deliveryAddress:
        "3rd Floor, Tech Park Residency, Electronic City, Bengaluru - 560100",
      paymentId: "PAY-882317901",
      paymentMethod: "Net Banking",
      totalAmount: 727,
      status: "Cancelled",
      orderTime: "2 hours ago",
      timestamp: "2026-08-04T09:56:00",
    },
    {
      id: "ORD-9837",
      customerName: "Ananya Deshmukh",
      customerPhone: "+91 98980 44332",
      itemsCount: 3,
      itemsList: [
        { name: "Four Cheese Gourmet", size: "Medium", qty: 1, price: 499 },
        {
          name: "Garlic Cheesy Stuffed Breadstick",
          size: "Regular",
          qty: 1,
          price: 199,
        },
        {
          name: "Double Chocolate Lava Cake",
          size: "Single",
          qty: 1,
          price: 179,
        },
      ],
      deliveryAddress: "Flat 701, Lotus Towers, Baner, Pune - 411045",
      paymentId: "PAY-882316550",
      paymentMethod: "UPI (Paytm)",
      totalAmount: 877,
      status: "Delivered",
      orderTime: "3 hours ago",
      timestamp: "2026-08-04T08:56:00",
    },
  ],
  menuItems: [
    {
      id: "m1",
      name: "Super Pepperoni Feast",
      category: "Pizza",
      description:
        "Loaded with double crispy pepperoni slices, molten mozzarella, and signature herb tomato sauce.",
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 349, Medium: 499, Large: 649 },
      isVeg: false,
      isPopular: true,
      inStock: true,
      rating: 4.9,
    },
    {
      id: "m2",
      name: "Truffle Mushroom Supreme",
      category: "Pizza",
      description:
        "Wild sauteed mushrooms, black truffle oil drizzle, caramelized onions, and fresh parmesan.",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 399, Medium: 549, Large: 699 },
      isVeg: true,
      isPopular: true,
      inStock: true,
      rating: 4.8,
    },
    {
      id: "m3",
      name: "Spicy Paneer Tikka Blast",
      category: "Pizza",
      description:
        "Marinated tandoori paneer, red capsicum, crisp onions, green chillies, and mint drizzle.",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 319, Medium: 459, Large: 599 },
      isVeg: true,
      isPopular: true,
      inStock: true,
      rating: 4.6,
    },
    {
      id: "m4",
      name: "BBQ Smoked Chicken Special",
      category: "Pizza",
      description:
        "Smoky grilled chicken, hickory BBQ swirl, red onions, sweet corn, and sharp cheddar.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 369, Medium: 519, Large: 669 },
      isVeg: false,
      isPopular: false,
      inStock: true,
      rating: 4.7,
    },
    {
      id: "m5",
      name: "Classic Margherita Deluxe",
      category: "Pizza",
      description:
        "San Marzano tomato sauce, fresh buffalo mozzarella, fresh basil leaves, and extra virgin olive oil.",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 249, Medium: 379, Large: 499 },
      isVeg: true,
      isPopular: false,
      inStock: true,
      rating: 4.8,
    },
    {
      id: "m6",
      name: "Garlic Cheesy Stuffed Breadstick",
      category: "Sides",
      description:
        "Fresh baked garlic breadsticks overflowing with melted mozzarella cheese and oregano butter.",
      image:
        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 149, Medium: 199, Large: 249 },
      isVeg: true,
      isPopular: true,
      inStock: true,
      rating: 4.7,
    },
    {
      id: "m7",
      name: "Crispy Peri Peri Wings",
      category: "Sides",
      description:
        "Juicy chicken wings tossed in spicy African bird's eye chili peri peri glaze.",
      image:
        "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 199, Medium: 289, Large: 399 },
      isVeg: false,
      isPopular: false,
      inStock: true,
      rating: 4.5,
    },
    {
      id: "m8",
      name: "Chilled Mango Fizz",
      category: "Beverages",
      description:
        "Refreshing sparkling Alphonso mango cooler with a dash of lime and fresh mint.",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 99, Medium: 129, Large: 159 },
      isVeg: true,
      isPopular: false,
      inStock: true,
      rating: 4.6,
    },
    {
      id: "m9",
      name: "Double Chocolate Lava Cake",
      category: "Desserts",
      description:
        "Warm molten chocolate cake with a gushing gooey fudge center.",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80",
      prices: { Small: 129, Medium: 179, Large: 229 },
      isVeg: true,
      isPopular: true,
      inStock: true,
      rating: 4.9,
    },
  ],
  users: [
    {
      id: "usr-101",
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "+91 98765 43210",
      isVerified: true,
      joinedDate: "15 Jan 2025",
      totalOrders: 14,
      totalSpent: 12450,
      avatarBg: "bg-red-500",
    },
    {
      id: "usr-102",
      name: "Priya Patel",
      email: "priya.p@example.com",
      phone: "+91 98123 76543",
      isVerified: true,
      joinedDate: "02 Feb 2025",
      totalOrders: 8,
      totalSpent: 6890,
      avatarBg: "bg-amber-500",
    },
    {
      id: "usr-103",
      name: "Rohan Verma",
      email: "rohan.v@example.com",
      phone: "+91 97654 12399",
      isVerified: true,
      joinedDate: "20 Mar 2025",
      totalOrders: 21,
      totalSpent: 18900,
      avatarBg: "bg-emerald-500",
    },
    {
      id: "usr-104",
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "+91 99887 11223",
      isVerified: false,
      joinedDate: "11 May 2025",
      totalOrders: 3,
      totalSpent: 1850,
      avatarBg: "bg-purple-500",
    },
    {
      id: "usr-105",
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 91234 56789",
      isVerified: true,
      joinedDate: "04 Jun 2025",
      totalOrders: 12,
      totalSpent: 11200,
      avatarBg: "bg-blue-500",
    },
    {
      id: "usr-106",
      name: "Ananya Deshmukh",
      email: "ananya.d@example.com",
      phone: "+91 98980 44332",
      isVerified: true,
      joinedDate: "29 Jul 2025",
      totalOrders: 6,
      totalSpent: 5400,
      avatarBg: "bg-rose-500",
    },
  ],
  messages: [
    {
      id: "msg-1",
      senderName: "Kabir Roy",
      email: "kabir.roy@gmail.com",
      phone: "+91 98450 99887",
      subject: "Inquiry about Bulk Catering for Corporate Event",
      message:
        "Hi Pizza Hub Team, We are hosting an IT tech summit next Friday with 120 guests and would like to place a bulk order for pizzas and sides. Do you offer corporate discount packages and live tracking for bulk delivery?",
      timestamp: "Today at 10:15 AM",
      isRead: false,
    },
    {
      id: "msg-2",
      senderName: "Meera Nair",
      email: "meera.nair@outlook.com",
      phone: "+91 97312 44556",
      subject: "Feedback on Truffle Mushroom Supreme Pizza",
      message:
        "Just ordered the Truffle Mushroom Supreme for dinner tonight and it was absolutely exquisite! The crust was perfectly crispy and cheese was so fresh. Compliments to your head chef!",
      timestamp: "Yesterday at 7:40 PM",
      isRead: true,
    },
    {
      id: "msg-3",
      senderName: "Siddharth Rao",
      email: "sid.rao@techhub.io",
      phone: "+91 99001 22334",
      subject: "Franchise Inquiry for North Bengaluru Location",
      message:
        "Hello Management, I am an experienced F&B franchisee interested in launching a new franchise store of The Pizza Hub in Yelahanka. Please share your franchise deck and contact information of your business development manager.",
      timestamp: "Aug 02, 2026",
      isRead: false,
    },
    {
      id: "msg-4",
      senderName: "Deepika Singh",
      email: "deepika.singh@yahoo.com",
      phone: "+91 98860 11992",
      subject: "Delivery Delay Inquiry for Order #ORD-9750",
      message:
        "Hi, my order yesterday took around 45 minutes to arrive. The pizza was warm but I would suggest improving delivery dispatch speed during peak hours. Thank you!",
      timestamp: "Jul 31, 2026",
      isRead: true,
    },
  ],
  adminProfile: {
    name: "Chef Marco V.",
    role: "General Operations Manager",
    email: "admin@pizzahub.com",
    avatar:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80",
    isLoggedIn: true,
  },
};

export function getStoredData() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading localStorage admin data:", err);
    return initialData;
  }
}

export function saveStoredData(data) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving localStorage admin data:", err);
  }
}
