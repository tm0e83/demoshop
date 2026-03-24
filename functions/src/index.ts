import {onSchedule} from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';
import initialData from './data.json';

admin.initializeApp();

export const resetDatabase = onSchedule('0 2 * * *', async () => {
  const db = admin.database();

  try {
    await db.ref('/').set(initialData);
    console.log('Database successfully reset to default state.');
  } catch (error) {
    console.error('Error resetting database:', error);
  }
});

export const resetUsers = onSchedule('0 2 * * *', async () => {
  const listUsersResult = await admin.auth().listUsers();
  const users = listUsersResult.users;
  const usersToDelete = users.filter(u => u.uid !== 'yDoOOSVHzxXk8tnvWFeY2jtvlGh2' && u.uid !== 'ze1ShRe4QQMI4gxadeKFngjsDo22').map(u => u.uid);
  
  try {
    await admin.auth().deleteUsers(usersToDelete);    
    console.log(`${usersToDelete.length} Benutzer wurden erfolgreich entfernt.`);
  } catch (error) {
    console.error('Error resetting users:', error);
  }
});