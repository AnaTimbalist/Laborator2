
const pool = require('./db');

async function seed() {
  try {
    // Clean up existing data (optional)
    await pool.query('DELETE FROM threads');
    await pool.query('DELETE FROM subreddits');
    await pool.query('DELETE FROM users');

    // Insert sample users
    const userRes = await pool.query(
      `INSERT INTO users (username, email, subscribed_subreddits)
       VALUES
       ('alice', 'alice@example.com', '{}'),
       ('bob', 'bob@example.com', '{}'),
       ('charlie', 'charlie@example.com', '{}')
       RETURNING *`
    );
    console.log('Seeded users:', userRes.rows);

    // Insert sample subreddits
    const subRes = await pool.query(
      `INSERT INTO subreddits (name, description)
       VALUES
       ('r/technology', 'Discussion about the latest technology trends'),
       ('r/science', 'All about science discoveries'),
       ('r/memes', 'Because the internet loves memes')
       RETURNING *`
    );
    console.log('Seeded subreddits:', subRes.rows);

    // Update user subscription for demonstration
    // Let's say user with id=1 (Alice) subscribes to subreddit ids 1 and 2
    await pool.query(
      `UPDATE users
       SET subscribed_subreddits = ARRAY[1, 2]
       WHERE id = 1`
    );

    // Insert sample threads
    const threadsRes = await pool.query(
      `INSERT INTO threads (subreddit_id, author_id, title, content)
       VALUES
       (1, 1, 'Future of AI', 'AI is taking over the world. Discuss!'),
       (2, 2, 'Climate Change 101', 'How can we reduce emissions?'),
       (3, 1, 'Funny Meme', 'Check out this hilarious meme about coding.')
       RETURNING *`
    );
    console.log('Seeded threads:', threadsRes.rows);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error while seeding:', error);
  } finally {
    pool.end();
  }
}

seed();
