-- Luxe Dining Experience Database Schema

CREATE TABLE IF NOT EXISTS menus (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    party_size INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed data for the Luxe Experience
INSERT INTO menus (category, item_name, description, price) VALUES
('Appetizers', 'Truffle Carpaccio', 'Thinly sliced Wagyu beef with white truffle oil and parmesan crisps', 28.00),
('Appetizers', 'Osetra Caviar', 'Premium sturgeon caviar served with blinis and crème fraîche', 120.00),
('Main Course', 'Butter Poached Lobster', 'Atlantic lobster tail with saffron risotto and lemon butter', 65.00),
('Main Course', 'Aged Ribeye Steak', 'Dry-aged 45-day beef with red wine reduction and pomme purée', 85.00),
('Desserts', 'Gold Leaf Chocolate Dome', 'Valrhona chocolate shell with raspberry mousse and 24k gold leaf', 22.00),
('Desserts', 'Yuzu Tart', 'Japanese citrus tart with toasted meringue and fresh berries', 18.00);
