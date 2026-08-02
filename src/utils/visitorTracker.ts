import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const logVisitor = async () => {
  try {
    // Check if we've already logged this session to prevent spamming
    if (sessionStorage.getItem('visitorLogged')) {
      return;
    }

    // Get IP and Location
    let ip = 'Unknown';
    let location = 'Unknown';
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data.ip) ip = data.ip;
      if (data.city && data.country_name) {
        location = `${data.city}, ${data.country_name}`;
      }
    } catch (e) {
      console.error('Could not fetch IP/Location');
    }

    // Get OS
    const userAgent = navigator.userAgent;
    let os = 'Unknown OS';
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    if (userAgent.indexOf("X11") !== -1) os = "UNIX";
    if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    if (/Android/.test(userAgent)) os = "Android";
    if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";

    // Save to Firestore
    await addDoc(collection(db, 'visitorLogs'), {
      ip,
      location,
      os,
      userAgent,
      timestamp: serverTimestamp()
    });

    sessionStorage.setItem('visitorLogged', 'true');
  } catch (error) {
    console.error('Error logging visitor:', error);
  }
};
