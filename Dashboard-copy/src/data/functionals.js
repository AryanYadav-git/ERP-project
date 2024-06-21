import axios from "axios";

export const handleButtonClick = async (record) => {
    try {
        const response = await axios.post('http://localhost:3000/cutting/update-active', {
          headers: {
            'Authorization':localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: record.id,  }),
        });
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        console.log('Status update successful');
        // Refresh the grid data or update the record locally
        record.status = 'Active'; // Update the status locally if needed
    } catch (error) {
        console.error('Error updating status:', error);
    }
};
