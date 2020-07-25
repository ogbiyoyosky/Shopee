'use strict'

/*
|--------------------------------------------------------------------------
| SubCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const sub_categories = [
  {
   sub_category_label: 'Laptops',
   category_id: 1
  },
  {
    sub_category_label: 'Mini Laptops and Netbooks',
    category_id: 1
   },
   {
    sub_category_label: 'Notebooks',
    category_id: 1
   },
   {
    sub_category_label: 'Hybrid PCs',
    category_id: 1
   },
   {
    sub_category_label: 'Macbooks',
    category_id: 1
   },
   {
    sub_category_label: 'Desktops & Monitors',
    category_id: 1
   },
   {
    sub_category_label: 'CPUs',
    category_id: 1
   },
   {
    sub_category_label: 'All In Ones',
    category_id: 1
   },
   {
    sub_category_label: 'Monitors',
    category_id: 1
   },
   {
    sub_category_label: 'UPS',
    category_id: 1
   },
   {
    sub_category_label: 'Servers',
    category_id: 1
   },
   {
    sub_category_label: 'Desktop Bundles',
    category_id: 1
   },
   {
    sub_category_label: 'Computing Accessories',
    category_id: 1
   },
   {
    sub_category_label: 'Computer Peripherals',
    category_id: 1
   },
   {
    sub_category_label: 'Bags, Cases, Covers & Sleeves',
    category_id: 1
   },
   {
    sub_category_label: 'Laptop & Desktop Accessories',
    category_id: 1
   },
   {
    sub_category_label: 'Storage Devices',
    category_id: 1
   },
   {
    sub_category_label: 'Printers, Scanners & Accessories',
    category_id: 1
   },
   {
    sub_category_label: 'Printers',
    category_id: 1
   },
   {
    sub_category_label: 'Scanners',
    category_id: 1
   },
   {
    sub_category_label: 'Inks, Toners & Cartridges',
    category_id: 1
   },
   {
    sub_category_label: 'Wifi & Networking',
    category_id: 1
   },
   {
    sub_category_label: 'Switches',
    category_id: 1
   },
   {
    sub_category_label: 'Routers',
    category_id: 1
   },
   {
    sub_category_label: 'Modems',
    category_id: 1
   },
   {
    sub_category_label: 'Networking Peripherals',
    category_id: 1
   },
   {
    sub_category_label: 'PC Gaming',
    category_id: 1
   },
   {
    sub_category_label: 'PC Games',
    category_id: 1
   },
   {
    sub_category_label: 'PC Gaming Accessories',
    category_id: 1
   },
   {
    sub_category_label: 'Software',
    category_id: 1
   },
   {
    sub_category_label: 'Office & Business',
    category_id: 1
   },
   {
    sub_category_label: 'Operating Systems',
    category_id: 1
   },
   {
    sub_category_label: 'Security & Utilities',
    category_id: 1
   },
   {
    sub_category_label: 'Projectors',
    category_id: 1
   },
   {
    sub_category_label: 'Mobile Phones',
    category_id: 2
   },
   {
    sub_category_label: 'Smartphones',
    category_id: 2
   },
   {
    sub_category_label: 'Feature Phones',
    category_id: 2
   },
   {
    sub_category_label: 'Mobile Phone Accessories',
    category_id: 2
   },
   {
    sub_category_label: 'Cables',
    category_id: 2
   },
   {
    sub_category_label: 'Cases & Covers',
    category_id: 2
   },
   {
    sub_category_label: 'Screen Protectors',
    category_id: 2
   },
   {
    sub_category_label: 'Chargers & Power Banks',
    category_id: 2
   },
   {
    sub_category_label: 'Earphones & Headsets',
    category_id: 2
   },
   {
    sub_category_label: 'Smartwatches & Bands',
    category_id: 2
   },
   {
    sub_category_label: 'Clips, Holders & Stands',
    category_id: 2
   },
   {
    sub_category_label: 'Batteries',
    category_id: 2
   },
   {
    sub_category_label: 'Tablets',
    category_id: 2
   },
   {
    sub_category_label: 'Android',
    category_id: 2
   },
   {
    sub_category_label: 'iOS',
    category_id: 2
   },
   {
    sub_category_label: 'Windows',
    category_id: 2
   },
   {
    sub_category_label: 'Other OS',
    category_id: 2
   },
   {
    sub_category_label: 'Tablet Accessories',
    category_id: 2
   },
   {
    sub_category_label: 'Cases & Covers',
    category_id: 2
   },
   {
    sub_category_label: 'Holders & Stands',
    category_id: 2
   },
   {
    sub_category_label: 'Other Accessories',
    category_id: 2
   },
   {
    sub_category_label: 'Top Brands',
    category_id: 2
   },
   {
    sub_category_label: 'Apple',
    category_id: 2
   },
   {
    sub_category_label: 'Samsung',
    category_id: 2
   },
   {
    sub_category_label: 'Tecno',
    category_id: 2
   },
   {
    sub_category_label: 'Nokia',
    category_id: 2
   },
   {
    sub_category_label: 'Blackberry',
    category_id: 2
   },
   {
    sub_category_label: 'Blackberry',
    category_id: 2
   },
   {
    sub_category_label: 'Gionee',
    category_id: 2
   },
   {
    sub_category_label: 'Televisions',
    category_id: 3
   },
   {
    sub_category_label: 'Smart TVs',
    category_id: 3
   },
   {
    sub_category_label: 'LED TVs',
    category_id: 3
   },
   {
    sub_category_label: 'Curved TVs',
    category_id: 3
   },
   {
    sub_category_label: 'OLED TVs',
    category_id: 3
   },
   {
    sub_category_label: 'Plasma TVs',
    category_id: 3
   },
   {
    sub_category_label: 'DVD Players and Recorders',
    category_id: 3
   },
   {
    sub_category_label: 'DVD Players',
    category_id: 3
   },
   {
    sub_category_label: 'DVD Recorders',
    category_id: 3
   },
   {
    sub_category_label: 'Cameras',
    category_id: 3
   },
   {
    sub_category_label: 'Digital Cameras',
    category_id: 3
   },
   {
    sub_category_label: 'Professional & SLR Cameras',
    category_id: 3
   },
   {
    sub_category_label: 'Camcorders & Video Cameras',
    category_id: 3
   },
   {
    sub_category_label: 'Camera Lenses & Accessories',
    category_id: 3
   },
   {
    sub_category_label: 'CCTV Cameras',
    category_id: 3
   },
   {
    sub_category_label: 'Accessories',
    category_id: 3
   },
   {
    sub_category_label: 'TV Audio',
    category_id: 3
   },
   {
    sub_category_label: 'Headphones',
    category_id: 3
   },
   {
    sub_category_label: 'Television Accessories',
    category_id: 3
   },
   {
    sub_category_label: 'Other Accessories',
    category_id: 3
   },
   {
    sub_category_label: 'Gaming Accessories',
    category_id: 3
   },
   {
    sub_category_label: 'Home Theatres & Audio Systems',
    category_id: 3
   },
   {
    sub_category_label: 'Home Theatre',
    category_id: 3
   },
   {
    sub_category_label: 'HiFi Systems',
    category_id: 3
   },
   {
    sub_category_label: 'MP3 Players & Speakers',
    category_id: 3
   },
   {
    sub_category_label: 'Games and Consoles',
    category_id: 3
   },
   {
    sub_category_label: 'PS4',
    category_id: 3
   },
   {
    sub_category_label: 'PS3',
    category_id: 3
   },
   {
    sub_category_label: 'Xbox One',
    category_id: 3
   },
   {
    sub_category_label: 'Xbox 360',
    category_id: 3
   },
   {
    sub_category_label: 'Nintendo Wii',
    category_id: 3
   },
   {
    sub_category_label: 'Sony PSP',
    category_id: 3
   },
   {
    sub_category_label: 'PS Vita',
    category_id: 3
   },
   {
    sub_category_label: 'Nintendo 3DS',
    category_id: 3
   },
   {
    sub_category_label: "Women's Wear",
    category_id: 4
   },
   {
    sub_category_label: 'Dresses',
    category_id: 4
   },
   {
    sub_category_label: 'Tops',
    category_id: 4
   },
   {
    sub_category_label: 'Trousers',
    category_id: 4
   },
   {
    sub_category_label: 'Jumpsuits & Playsuits',
    category_id: 4
   },
   {
    sub_category_label: 'Suits & Blazers',
    category_id: 4
   },
   {
    sub_category_label: 'Skirts',
    category_id: 4
   },
   {
    sub_category_label: 'Co-ordinates',
    category_id: 4
   },
   {
    sub_category_label: 'Lingerie & Sleepwear',
    category_id: 4
   },
   {
    sub_category_label: 'Ready to Wear',
    category_id: 4
   },
   {
    sub_category_label: "Women's Shoes",
    category_id: 4
   },
   {
    sub_category_label: "Heels",
    category_id: 4
   },
   {
    sub_category_label: "Sandals & Slippers",
    category_id: 4
   },
   {
    sub_category_label: "Wedges",
    category_id: 4
   },
   {
    sub_category_label: "Sport Shoes",
    category_id: 4
   },
   {
    sub_category_label: "Shoes & Bags",
    category_id: 4
   },
   {
    sub_category_label: "Women's Accessories",
    category_id: 4
   },
   {
    sub_category_label: "Bags",
    category_id: 4
   },
   {
    sub_category_label: "Belts",
    category_id: 4
   },
   {
    sub_category_label: "Purses & Clutches",
    category_id: 4
   },
   {
    sub_category_label: "Wallets",
    category_id: 4
   },
   {
    sub_category_label: "Jewellery",
    category_id: 4
   },
   {
    sub_category_label: "Hats & Scarves",
    category_id: 4
   },
   {
    sub_category_label: "Men's Wear",
    category_id: 4
   },
   {
    sub_category_label: "Shirts",
    category_id: 4
   },
   {
    sub_category_label: "Polos",
    category_id: 4
   },
   {
    sub_category_label: "T-Shirts",
    category_id: 4
   },
   {
    sub_category_label: "Jeans",
    category_id: 4
   },
   {
    sub_category_label: "Trousers & Shorts",
    category_id: 4
   },
   {
    sub_category_label: "Suits, Blazers & Jackets",
    category_id: 4
   },
   {
    sub_category_label: "Pyjamas",
    category_id: 4
   },
   {
    sub_category_label: "Jerseys",
    category_id: 4
   },
   {
    sub_category_label: "Traditional WearWomen's Shoes",
    category_id: 4
   },
   {
    sub_category_label: "TMen's Shoes",
    category_id: 4
   },
   {
    sub_category_label: "Casual Shoes",
    category_id: 4
   },
   {
    sub_category_label: "Formal Shoes",
    category_id: 4
   },
   {
    sub_category_label: "Slippers & Sandals",
    category_id: 4
   },
   {
    sub_category_label: "Shoe Care & Accessories",
    category_id: 4
   },
   {
    sub_category_label: "Men's Accessoriess",
    category_id: 4
   },
   {
    sub_category_label: "Belts & Wallets",
    category_id: 4
   },
   {
    sub_category_label: "Socks & Underwear",
    category_id: 4
   },
   {
    sub_category_label: "Caps & Hats",
    category_id: 4
   },
   {
    sub_category_label: "Bags",
    category_id: 4
   },
   {
    sub_category_label: "Large Appliances",
    category_id: 5
   },
   {
    sub_category_label: "Air Conditioners & Coolers",
    category_id: 5
   },
   {
    sub_category_label: "Fans",
    category_id: 5
   },
   {
    sub_category_label: "Freezers",
    category_id: 5
   },

   {
    sub_category_label: "Washers & Dryers",
    category_id: 5
   },
   {
    sub_category_label: "Refrigerators",
    category_id: 5
   },
   {
    sub_category_label: "Cookers & Ovens",
    category_id: 5
   },
   {
    sub_category_label: "Water Dispensers",
    category_id: 5
   },
   {
    sub_category_label: "Vacuum Cleaners",
    category_id: 5
   },
   {
    sub_category_label: "Small Appliances",
    category_id: 5
   },

   {
    sub_category_label: "Blenders, Juicers & Mixers",
    category_id: 5
   },
   {
    sub_category_label: "Hot Plates & Burners",
    category_id: 5
   },

   {
    sub_category_label: "Irons & Steamers",
    category_id: 5
   },
   {
    sub_category_label: "Processors & Mincers",
    category_id: 5
   },
   {
    sub_category_label: "Toasters & Sandwich Makers",
    category_id: 5
   },
   {
    sub_category_label: "Deep Fryers & Rice Cookers",
    category_id: 5
   },
   {
    sub_category_label: "Electric Kettles",
    category_id: 5
   },
   {
    sub_category_label: "Microwaves",
    category_id: 5
   },
   {
    sub_category_label: "Yam Pounder",
    category_id: 5
   },
   {
    sub_category_label: "Home Furnishings",
    category_id: 5
   },

   {
    sub_category_label: "Bed & Bathroom Furnishings",
    category_id: 5
   },
   {
    sub_category_label: "Curtains & Blinds",
    category_id: 5
   },

   {
    sub_category_label: "Decor",
    category_id: 5
   },
   {
    sub_category_label: "Light Fixtures",
    category_id: 5
   },

   {
    sub_category_label: "Rugs & Carpets",
    category_id: 5
   },
   {
    sub_category_label: "Housekeeping & Pet Supplies",
    category_id: 5
   },
   {
    sub_category_label: "Top Brands",
    category_id: 5
   },
   {
    sub_category_label: "LG",
    category_id: 5
   },
   {
    sub_category_label: "Samsung",
    category_id: 5
   },
   {
    sub_category_label: "Polystar",
    category_id: 5
   },
   {
    sub_category_label: "Scanfrost",
    category_id: 5
   },
   {
    sub_category_label: "Hisense",
    category_id: 5
   },

   {
    sub_category_label: "Haier Thermocool",
    category_id: 5
   },
   {
    sub_category_label: "Master Chef",
    category_id: 5
   },

   {
    sub_category_label: "Kitchen & Dining",
    category_id: 5
   },

   {
    sub_category_label: "Cook and Bakeware",
    category_id: 5
   },
   {
    sub_category_label: "Dining",
    category_id: 5
   },
   {
    sub_category_label: "Kitchen Utensils",
    category_id: 5
   },
   {
    sub_category_label: "Cooker Hoods & Ventilators",
    category_id: 5
   },

   {
    sub_category_label: "Furniture",
    category_id: 5
   },
   {
    sub_category_label: "Living Room Furniture",
    category_id: 5
   },
   {
    sub_category_label: "Bedroom Furniture",
    category_id: 5
   },
   {
    sub_category_label: "Office Furniture",
    category_id: 5
   },
   {
    sub_category_label: "Kitchen & Dining Furniture",
    category_id: 5
   },
   {
    sub_category_label: "Baby, Kids and Toys",
    category_id: 6
   },
   {
    sub_category_label: "Sub-categories",
    category_id: 6
   },
   {
    sub_category_label: "Fashion for Girls",
    category_id: 6
   },
   {
    sub_category_label: "Sets",
    category_id: 6
   },
   {
    sub_category_label: "Dresses",
    category_id: 6
   },
   {
    sub_category_label: "Tops, Jackets, & Sweatshirts",
    category_id: 6
   },
   {
    sub_category_label: "Denim, Trousers & Leggings",
    category_id: 6
   },
   {
    sub_category_label: "Underwear & Socks",
    category_id: 6
   },
   {
    sub_category_label: "Shoes",
    category_id: 6
   },
   {
    sub_category_label: "Shirts",
    category_id: 6
   },
   {
    sub_category_label: "Baby Essentials",
    category_id: 6
   },
   {
    sub_category_label: "Bibs & Burp Cloths",
    category_id: 6
   },

   {
    sub_category_label: "Bottle Feeding",
    category_id: 6
   },
   {
    sub_category_label: "Breastfeeding",
    category_id: 6
   },
   {
    sub_category_label: "Pacifiers & Teethers",
    category_id: 6
   },
   {
    sub_category_label: "Baby Food & Formula",
    category_id: 6
   },
   {
    sub_category_label: "Feeding & Nursing",
    category_id: 6
   },
   {
    sub_category_label: "Maternity",
    category_id: 6
   },
   {
    sub_category_label: "Maternity Tops & Jackets",
    category_id: 6
   },
   {
    sub_category_label: "Maternity Dresses",
    category_id: 6
   },
   {
    sub_category_label: "Maternity Trousers & Skirts",
    category_id: 6
   },
   {
    sub_category_label: "Maternity Underwear",
    category_id: 6
   },
   {
    sub_category_label: "Maternity Accessories",
    category_id: 6
   },
   {
    sub_category_label: "School Store",
    category_id: 6
   },
   {
    sub_category_label: "Bags & Backpacks",
    category_id: 6
   },

   {
    sub_category_label: "Lunchboxes & Waterbottles",
    category_id: 6
   },
   {
    sub_category_label: "School Uniform & Accessories",
    category_id: 6
   },

   {
    sub_category_label: "School Shoes",
    category_id: 6
   },
   {
    sub_category_label: "Travel & Safety Gear",
    category_id: 6
   },
   {
    sub_category_label: "Car Seats, Strollers & Carriers",
    category_id: 6
   },{
    sub_category_label: "Baby Monitors & Safety Gates",
    category_id: 6
   },
   {
    sub_category_label: "Mobile Beds & Nets",
    category_id: 6
   },

   {
    sub_category_label: "High Chairs & Booster Seats",
    category_id: 6
   },
   {
    sub_category_label: "Cars",
    category_id: 7
   },
   {
    sub_category_label: "Buses",
    category_id: 7
   },
   {
    sub_category_label: "Heavy Equipments",
    category_id: 7
   },
   {
    sub_category_label: "Motorcycles & Scooters",
    category_id: 7
   },
   {
    sub_category_label: "Trucks & Trailers",
    category_id: 7
   },
   {
    sub_category_label: "Vehicle Parts & Accessories",
    category_id: 7
   },
   {
    sub_category_label: "Watercraft & Boats",
    category_id: 7
   },

   {
    sub_category_label: "Beauty, Health & Personal Care",
    category_id: 8
   },
   {
    sub_category_label: "Makeup",
    category_id: 8
   },
   {
    sub_category_label: "Fragrances",
    category_id: 8
   },
   {
    sub_category_label: "Hair Centre",
    category_id: 8
   },
   {
    sub_category_label: "Health",
    category_id: 8
   },

   {
    sub_category_label: "Skin Care",
    category_id: 8
   },
   {
    sub_category_label: "Personal Care",
    category_id: 8
   },
   {
    sub_category_label: "Sexual Wellness",
    category_id: 8
   },
   {
    sub_category_label: "Sports and Fitness",
    category_id: 8
   },
   {
    sub_category_label: "Fitness",
    category_id: 8
   },
   {
    sub_category_label: "Outdoor & Indoor Games",
    category_id: 8
   },
   {
    sub_category_label: "Sportswear",
    category_id: 8
   },
   {
    sub_category_label: "Football",
    category_id: 8
   },
   {
    sub_category_label: "Swimming",
    category_id: 8
   },
   {
    sub_category_label: "Boxing",
    category_id: 8
   },
   {
    sub_category_label: "Basketball",
    category_id: 8
   },
   {
    sub_category_label: "Books & Media Library",
    category_id: 8
   },
   {
    sub_category_label: "Books",
    category_id: 8
   },
   {
    sub_category_label: "Musical Equipment",
    category_id: 8
   },
   {
    sub_category_label: "Keyboard, Pianos & Drums",
    category_id: 8
   },
   {
    sub_category_label: "Stage, Studio & Recording Equipment",
    category_id: 8
   },
   {
    sub_category_label: "Wind Instruments",
    category_id: 8
   },
   {
    sub_category_label: "String Instruments",
    category_id: 8
   },
   {
    sub_category_label: "Audio Books",
    category_id: 8
   },
   {
    sub_category_label: "African Tales",
    category_id: 8
   },
   {
    sub_category_label: "Alcoholic Beverages",
    category_id: 8
   },
   {
    sub_category_label: "Wines",
    category_id: 8
   },
   {
    sub_category_label: "Spirits",
    category_id: 8
   },
   {
    sub_category_label: "Liqueurs & Creams",
    category_id: 8
   },
   {
    sub_category_label: "Whiskey",
    category_id: 8
   },
   {
    sub_category_label: "Champagne",
    category_id: 8
   },
   {
    sub_category_label: "Office & School Supplies",
    category_id: 8
   },
   {
    sub_category_label: "Greeting Cards",
    category_id: 8
   },
   {
    sub_category_label: "School Supplies",
    category_id: 8
   },
   {
    sub_category_label: "Office Supplies",
    category_id: 8
   },
   {
    sub_category_label: "Build Your Office",
    category_id: 8
   },
   {
    sub_category_label: "Generators & Power Solutions",
    category_id: 8
   },
   {
    sub_category_label: "Generators & Accessories",
    category_id: 8
   },
   {
    sub_category_label: "Inverters",
    category_id: 8
   },
   {
    sub_category_label: "UPS & Surge Protectors",
    category_id: 8
   },
   {
    sub_category_label: "Solar & Alternative Energy",
    category_id: 8
   }
  ]

class SubCategorySeeder {
  async run () {
    await Database.raw('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.truncate('sub_categories')

    await Database
      .from('sub_categories')
      .insert(sub_categories)

    await Database.raw('SET FOREIGN_KEY_CHECKS = 1;')
  }
}

module.exports = SubCategorySeeder
