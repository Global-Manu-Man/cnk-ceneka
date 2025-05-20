const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudName = 'dolznek84'; // reemplaza con tu nombre real de Cloudinary

const getCloudinaryImages = async (req, res) => {
  try {
    if (!apiKey || !apiSecret) {
      return res.status(500).json({ 
        success: false, 
        message: 'Credenciales de Cloudinary no configuradas' 
      });
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

    const response = await axios.get(url, {
      auth: {
        username: apiKey,
        password: apiSecret
      },
      params: {
        max_results: 100
      }
    });

    return res.status(200).json({
      success: true,
      data: response.data.resources
    });

  } catch (error) {
    console.error('Error al obtener imágenes de Cloudinary:', error);

    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.error?.message || 'Error al obtener imágenes de Cloudinary',
      error: error.message
    });
  }
};

module.exports = {
  getCloudinaryImages
};