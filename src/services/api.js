const API_BASE_URL = "http://localhost:5000";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Auth
  login: async (username, password) => {
    await delay(1000);

    if (password !== "test123") {
      throw new Error('Invalid credentials. Password must be "test123".');
    }

    // Mock JWT token (in a real app, this would come from the server)
    const mockToken = `mock_jwt_${btoa(username)}_${Date.now()}`;

    return {
      username,
      email: `${username}@example.com`,
      token: mockToken,
    };
  },

  // Contracts
  getContracts: async () => {
    await delay(800);

    const response = await fetch(`${API_BASE_URL}/contracts`);
    if (!response.ok) {
      throw new Error("Failed to fetch contracts");
    }

    return response.json();
  },

  getContractDetail: async (id) => {
    await delay(600);

    const response = await fetch(`${API_BASE_URL}/contractDetails`);
    if (!response.ok) {
      throw new Error("Failed to fetch contract details");
    }

    const allDetails = await response.json();
    const contractDetail = allDetails[id];

    if (!contractDetail) {
      throw new Error("Contract not found");
    }

    return contractDetail;
  },

  // File upload simulation
  uploadFile: async (file, onProgress) => {
    const chunks = 10;
    const chunkDelay = 200;

    for (let i = 0; i <= chunks; i++) {
      await delay(chunkDelay);
      const progress = (i / chunks) * 100;
      onProgress?.(progress);
    }

    // Simulate occasional upload failures (20% chance)
    if (Math.random() < 0.2) {
      throw new Error("Upload failed. Please try again.");
    }
  },
};
