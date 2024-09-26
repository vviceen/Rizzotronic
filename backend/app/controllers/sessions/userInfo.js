export async function getUserInfo() {
    try {
      const response = await fetch('/Rizzotronic/backend/app/services/sessionData.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return [];
    }
  }