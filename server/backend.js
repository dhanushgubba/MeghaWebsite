const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

const uri =
  'mongodb+srv://dhanush:dhanush@cluster0.ar7z0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

app.get('/klef/test', async function (req, res) {
  res.json('Koneru Lakshmaiah Education Foundation');
});

app.post('/klef/cse', async function (req, res) {
  res.json(req.body);
});

app.get('/', (req, res) => {
  res.send('Welcome to Megha App!');
});

app.post('/contact/submit', async function (req, res) {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const collection = db.collection('contact');

    const result = await collection.insertOne(req.body);

    await conn.close();

    res.status(200).json({ message: 'Contact saved successfully', result });
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to save contact', details: err.message });
  }
});

app.post('/register/signup', async function (req, res) {
  let conn;
  try {
    const { collegeid, firstname, lastname, email, contact, password } =
      req.body;
    if (
      !collegeid ||
      !firstname ||
      !lastname ||
      !email ||
      !contact ||
      !password
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const result = await collection.insertOne({
      collegeid,
      firstname,
      lastname,
      email,
      contact,
      password,
    });
    await conn.close();

    res.status(200).json({ message: 'Registered Successfully', result });
  } catch (err) {
    if (conn) await conn.close();
    res.status(500).json({ error: 'Failed to register', details: err.message });
  }
});

app.post('/login/signin', async function (req, res) {
  let conn;
  try {
    const { collegeid, password } = req.body;

    if (!collegeid || !password) {
      console.log('Collegeid or password missing');
      return res
        .status(400)
        .json({ error: 'collegeid and password are required' });
    }

    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const collection = db.collection('users');

    const user = await collection.findOne({ collegeid });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('Login successful for user:', collegeid);
    res.status(200).json({ message: 'Login successful' });
    await conn.close();
  } catch (err) {
    if (conn) await conn.close();
    console.error('Error in login route:', err.message); // Log error details
    res.status(500).json({ error: 'Failed to login', details: err.message });
  }
});

app.post('/adminregister/signup', async function (req, res) {
  let conn;
  try {
    const { idno, firstname, lastname, email, contact, password } = req.body;
    if (!idno || !firstname || !lastname || !email || !contact || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const collection = db.collection('adminusers');

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const result = await collection.insertOne({
      idno,
      firstname,
      lastname,
      email,
      contact,
      password,
    });
    await conn.close();

    res.status(200).json({ message: 'Registered Successfully', result });
  } catch (err) {
    if (conn) await conn.close();
    res.status(500).json({ error: 'Failed to register', details: err.message });
  }
});

//ADMIN LOGIN
app.post('/adminlogin/signin', async function (req, res) {
  let conn;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Email or password missing');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const collection = db.collection('adminusers');

    const user = await collection.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('Login successful for user:', email);
    res.status(200).json({ message: 'Login successful' });
    await conn.close();
  } catch (err) {
    if (conn) await conn.close();
    console.error('Error in login route:', err.message); // Log error details
    res.status(500).json({ error: 'Failed to login', details: err.message });
  }
});

app.post('/user/forgot-password', async function (req, res) {
  let conn;
  try {
    const { email } = req.body;
    if (!email) {
      console.log('Email is Missing...');
      return res.status(400).json({ error: 'Email is required' });
    }
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const collection = db.collection('users');

    const user = await collection.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Set the email in the session after validation
    req.session.email = email;

    console.log('Email validated for:', email);
    res.status(200).json({ message: 'Email validated' });
    await conn.close();
  } catch (err) {
    if (conn) await conn.close();
    console.error('Error in forgot-password route:', err.message);
    res
      .status(500)
      .json({ error: 'Failed to validate email', details: err.message });
  }
});

app.post('/user/reset-password', async function (req, res) {
  let conn;
  try {
    const { newpassword } = req.body;

    if (!newpassword) {
      return res.status(400).json({ error: 'Password is required' });
    }

    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const collection = db.collection('users');

    // Retrieve email from session
    const email = req.session.email;

    if (!email) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    // Update user's password
    const result = await collection.updateOne(
      { email }, // Find user by email
      { $set: { password: newpassword } } // Set new password
    );

    await conn.close();

    if (result.modifiedCount > 0) {
      console.log('Password updated successfully for:', email);
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ error: 'Failed to update password' });
    }
  } catch (err) {
    if (conn) await conn.close();
    console.error('Error occurred:', err);
    res
      .status(500)
      .json({ error: 'Failed to update password', details: err.message });
  }
});

app.get('/messages', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const messages = await db
      .collection('messages')
      .find()
      .sort({ createdAt: 1 })
      .toArray();
    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch messages', details: err.message });
  }
});

app.post('/messages', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const newMessage = { ...req.body, createdAt: new Date() }; // Add timestamp
    const result = await db.collection('messages').insertOne(newMessage);
    res.status(201).json(result.ops[0]); // Return the inserted message
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to save message', details: err.message });
  }
});

// Get all events
app.get('/api/events', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const events = await db.collection('events').find().toArray(); // Get all events
    res.json(events);
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to fetch events', details: err.message });
  }
});

// Add a new event
app.post('/api/events', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const newEvent = { ...req.body, createdAt: new Date() }; // Add timestamp
    const result = await db.collection('events').insertOne(newEvent);
    await conn.close();
    res.status(201).json(result.ops[0]); // Return the inserted event
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to save event', details: err.message });
  }
});

// Update an existing event
app.put('/api/events/:editId', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { editId } = req.params; // Get the event ID from the URL
    const updatedEvent = req.body; // Get the updated event details from the request body

    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(editId) }, // Find the event by ID
      { $set: updatedEvent } // Update all fields in the event
    );

    await conn.close();
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Event updated successfully' });
    } else {
      res.status(404).json({ error: 'Event not found or no changes made' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to update event', details: err.message });
  }
});

// Delete an event
app.delete('/api/events/:id', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { id } = req.params;

    // Attempt to delete the event by ID
    const result = await db
      .collection('events')
      .deleteOne({ _id: new ObjectId(id) }); // Use ObjectId

    await conn.close();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to delete event', details: err.message });
  }
});

// Register for an event
app.post('/api/events/:eventId/register', async (req, res) => {
  const { eventId } = req.params;
  const { collegeid } = req.body;

  if (!collegeid) {
    return res.status(400).json({ error: 'Email is required' });
  }

  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');

    // Find the event by ID
    const event = await db
      .collection('events')
      .findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.participants && event.participants.includes(collegeid)) {
      return res
        .status(400)
        .json({ error: 'User is already registered for this event' });
    }

    // Add email to participants
    const updatedParticipants = event.participants
      ? [...event.participants, collegeid]
      : [collegeid];
    await db
      .collection('events')
      .updateOne(
        { _id: new ObjectId(eventId) },
        { $set: { participants: updatedParticipants } }
      );

    res.json({
      message: 'Successfully registered for the event',
      title: event.title,
    });
  } catch (error) {
    console.error('Failed to register for the event:', error);
    res.status(500).json({ error: 'Failed to register for the event' });
  } finally {
    if (conn) await conn.close(); // Ensure the connection is closed
  }
});

// Get participants for a specific event
app.get('/api/events/:eventId/participants', async (req, res) => {
  const { eventId } = req.params;
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const event = await db
      .collection('events')
      .findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event.participants || []); // Return participants or an empty array
  } catch (err) {
    console.error('Failed to fetch participants:', err);
    res.status(500).json({ error: 'Failed to fetch participants' });
  } finally {
    if (conn) await conn.close();
  }
});

app.post('/api/events/:eventId/attendance', async (req, res) => {
  const { attendanceStatus } = req.body; // Array of attendance data with presence information
  const { eventId } = req.params;
  let conn;

  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');

    // Filter the attendanceStatus to get only the participants who are present
    const presentCollegeIds = attendanceStatus
      .filter(({ present }) => present)
      .map(({ collegeid }) => collegeid);

    // Check if the event document already exists
    const existingEvent = await db.collection('eventsattendance').findOne({
      eventId: new ObjectId(eventId),
    });

    if (existingEvent) {
      // Check if any of the present college IDs have already been recorded
      const alreadyMarkedIds = presentCollegeIds.filter((id) =>
        existingEvent.collegeIds.includes(id)
      );
      if (alreadyMarkedIds.length > 0) {
        return res.status(400).json({
          message: `Attendance already submitted for participants with college IDs: ${alreadyMarkedIds.join(
            ', '
          )}`,
        });
      }

      // Update the event document by adding new college IDs to the array
      await db
        .collection('eventsattendance')
        .updateOne(
          { eventId: new ObjectId(eventId) },
          { $addToSet: { collegeIds: { $each: presentCollegeIds } } }
        );
    } else {
      // Insert a new document for the event with the list of present college IDs
      await db.collection('eventsattendance').insertOne({
        eventId: new ObjectId(eventId),
        collegeIds: presentCollegeIds,
      });
    }

    res.status(200).json({ message: 'Attendance saved successfully.' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while saving attendance.' });
  } finally {
    if (conn) await conn.close();
  }
});

app.get('/api/vouchers', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const vouchers = await db.collection('vouchers').find().toArray(); // Get all vouchers
    res.json(vouchers);
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to fetch vouchers', details: err.message });
  }
});

app.post('/api/vouchers', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const newVoucher = { ...req.body, createdAt: new Date() }; // Add timestamp
    const result = await db.collection('vouchers').insertOne(newVoucher);
    await conn.close();
    res.status(201).json(result.ops[0]); // Return the inserted voucher
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to save voucher', details: err.message });
  }
});

app.put('/api/vouchers/:editId', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { editId } = req.params; // Get the voucher ID from the URL
    const updatedVoucher = req.body; // Get the updated voucher details from the request body

    const result = await db.collection('vouchers').updateOne(
      { _id: new ObjectId(editId) }, // Find the voucher by ID
      { $set: updatedVoucher } // Update all fields in the voucher
    );

    await conn.close();
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Voucher updated successfully' });
    } else {
      res.status(404).json({ error: 'Voucher not found or no changes made' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to update voucher', details: err.message });
  }
});
app.delete('/api/vouchers/:id', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { id } = req.params;

    // Attempt to delete the voucher by ID
    const result = await db
      .collection('vouchers')
      .deleteOne({ _id: new ObjectId(id) }); // Use ObjectId

    await conn.close();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Voucher deleted successfully' });
    } else {
      res.status(404).json({ error: 'Voucher not found' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to delete voucher', details: err.message });
  }
});

app.post('/api/certifications', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const newCertification = { ...req.body, createdAt: new Date() };
    const result = await db
      .collection('certifications')
      .insertOne(newCertification);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Failed to save certification', details: err.message });
  } finally {
    if (conn) await conn.close();
  }
});
app.get('/api/certifications', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const certifications = await db
      .collection('certifications')
      .find()
      .toArray(); // Get all events
    res.json(certifications);
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to fetch certifications', details: err.message });
  }
});
app.put('/api/certifications/:editId', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { editId } = req.params; // Get the event ID from the URL
    const updatedCertification = req.body; // Get the updated event details from the request body

    const result = await db.collection('certifications').updateOne(
      { _id: new ObjectId(editId) }, // Find the event by ID
      { $set: updatedCertification } // Update all fields in the event
    );

    await conn.close();
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Certification updated successfully' });
    } else {
      res
        .status(404)
        .json({ error: 'Certification not found or no changes made' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to update Certrification', details: err.message });
  }
});

// Delete an event
app.delete('/api/certifications/:id', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { id } = req.params;

    // Attempt to delete the event by ID
    const result = await db
      .collection('certifications')
      .deleteOne({ _id: new ObjectId(id) }); // Use ObjectId

    await conn.close();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Certification deleted successfully' });
    } else {
      res.status(404).json({ error: 'Certification not found' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to delete certification', details: err.message });
  }
});

//GALLERY SECTION CODE
app.post('/api/gallery', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const newGallery = { ...req.body, createdAt: new Date() };
    const result = await db.collection('gallery').insertOne(newGallery);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Failed to save gallery', details: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

app.get('/api/gallery', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const gallery = await db.collection('gallery').find().toArray(); // Get all events
    res.json(gallery);
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to fetch gallery', details: err.message });
  }
});

app.put('/api/gallery/:editId', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { editId } = req.params; // Get the event ID from the URL
    const updatedGallery = req.body; // Get the updated event details from the request body

    const result = await db.collection('gallery').updateOne(
      { _id: new ObjectId(editId) }, // Find the event by ID
      { $set: updatedGallery } // Update all fields in the event
    );

    await conn.close();
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Gallery updated successfully' });
    } else {
      res.status(404).json({ error: 'Gallery not found or no changes made' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to update Gallery', details: err.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  let conn;
  try {
    conn = await client.connect();
    const db = conn.db('Meghawebsite');
    const { id } = req.params;

    // Attempt to delete the event by ID
    const result = await db
      .collection('gallery')
      .deleteOne({ _id: new ObjectId(id) }); // Use ObjectId

    await conn.close();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Gallery deleted successfully' });
    } else {
      res.status(404).json({ error: 'Gallery not found' });
    }
  } catch (err) {
    if (conn) await conn.close();
    res
      .status(500)
      .json({ error: 'Failed to delete gallery', details: err.message });
  }
});
