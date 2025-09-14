-- Professional Blog Database Setup
-- Create database and user

CREATE DATABASE IF NOT EXISTS blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (replace 'blog_user' and 'blog_password' with your credentials)
CREATE USER IF NOT EXISTS 'blog_user'@'localhost' IDENTIFIED BY 'blog_password';
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;

-- Use the database
USE blog_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    bio TEXT,
    avatar_url VARCHAR(255),
    role ENUM('admin', 'editor', 'author', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role)
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#2563eb',
    icon VARCHAR(50),
    parent_id INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(255),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    post_type ENUM('text', 'video', 'audio', 'image') DEFAULT 'text',
    author_id INT NOT NULL,
    category_id INT,
    tags JSON,
    meta_description VARCHAR(160),
    meta_keywords VARCHAR(255),
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    ai_metadata JSON,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_author (author_id),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    INDEX idx_published (published_at),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_content (title, content, excerpt)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT,
    parent_id INT NULL,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
    INDEX idx_post (post_id),
    INDEX idx_user (user_id),
    INDEX idx_parent (parent_id),
    INDEX idx_approved (is_approved)
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT,
    comment_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_post (user_id, post_id),
    UNIQUE KEY unique_user_comment (user_id, comment_id),
    INDEX idx_user (user_id),
    INDEX idx_post (post_id),
    INDEX idx_comment (comment_id)
);

-- Media files table
CREATE TABLE IF NOT EXISTS media_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type ENUM('image', 'video', 'audio', 'document') NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    width INT,
    height INT,
    duration INT, -- for video/audio files in seconds
    alt_text VARCHAR(255),
    caption TEXT,
    uploaded_by INT NOT NULL,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_type (file_type),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_ai_generated (is_ai_generated)
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    language VARCHAR(10) DEFAULT 'ar',
    theme ENUM('light', 'dark', 'auto') DEFAULT 'auto',
    notifications JSON,
    reading_preferences JSON,
    ai_preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user (user_id)
);

-- AI interactions table
CREATE TABLE IF NOT EXISTS ai_interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    interaction_type ENUM('content_generation', 'translation', 'image_generation', 'speech_to_text', 'text_to_speech', 'grammar_check') NOT NULL,
    input_data JSON,
    output_data JSON,
    model_used VARCHAR(100),
    tokens_used INT,
    cost DECIMAL(10, 4),
    processing_time INT, -- in milliseconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_type (interaction_type),
    INDEX idx_created (created_at)
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    entity_type ENUM('post', 'user', 'category', 'page') NOT NULL,
    entity_id INT,
    user_id INT,
    metadata JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_event_type (event_type),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, role, is_active, is_verified) 
VALUES ('admin', 'admin@blog.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KzKz2a', 'Admin', 'User', 'admin', TRUE, TRUE)
ON DUPLICATE KEY UPDATE username=username;

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon) VALUES
('التكنولوجيا', 'technology', 'مقالات حول التكنولوجيا والبرمجة', '#3b82f6', 'fas fa-laptop-code'),
('الذكاء الاصطناعي', 'artificial-intelligence', 'مقالات حول الذكاء الاصطناعي والتعلم الآلي', '#8b5cf6', 'fas fa-robot'),
('التطوير', 'development', 'مقالات حول تطوير البرمجيات', '#10b981', 'fas fa-code'),
('التصميم', 'design', 'مقالات حول التصميم والواجهات', '#f59e0b', 'fas fa-palette'),
('الأعمال', 'business', 'مقالات حول ريادة الأعمال والأعمال', '#ef4444', 'fas fa-briefcase')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Create default user preferences for admin
INSERT INTO user_preferences (user_id, language, theme, notifications, reading_preferences, ai_preferences) 
VALUES (1, 'ar', 'auto', '{"email": true, "push": true, "comments": true}', '{"font_size": "medium", "line_height": "normal"}', '{"auto_translate": false, "ai_suggestions": true}')
ON DUPLICATE KEY UPDATE user_id=VALUES(user_id);
