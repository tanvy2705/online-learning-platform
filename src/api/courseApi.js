import axiosClient from './axiosClient';

const courseApi = {
  getAllCourses: (params) => {
    return axiosClient.get('/courses', { params });
  },

  getCourseById: (id) => {
    return axiosClient.get(`/courses/${id}`);
  },

  createCourse: (courseData) => {
    return axiosClient.post('/courses', courseData);
  },

  updateCourse: (id, courseData) => {
    return axiosClient.put(`/courses/${id}`, courseData);
  },

  deleteCourse: (id) => {
    return axiosClient.delete(`/courses/${id}`);
  },

  uploadThumbnail: (id, formData) => {
    return axiosClient.post(`/courses/${id}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCategories: () => {
    return axiosClient.get('/courses/categories');
  },

  getCoursesByCategory: (categoryId) => {
    return axiosClient.get(`/courses/category/${categoryId}`);
  },

  getEnrolledCourses: () => {
    return axiosClient.get('/courses/enrolled');
  },

  enrollCourse: (courseId) => {
    return axiosClient.post(`/courses/${courseId}/enroll`);
  },

  getCourseProgress: (courseId) => {
    return axiosClient.get(`/courses/${courseId}/progress`);
  },

  updateProgress: (courseId, lessonId) => {
    return axiosClient.post(`/courses/${courseId}/lessons/${lessonId}/complete`);
  },
};

// Add these methods to your existing courseApi.js file

// Get lessons by course ID
export const getLessonsByCourse = async (courseId) => {
  try {
    const response = await api.get(`/lessons/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

// Mark lesson as completed
export const markLessonComplete = async (courseId, lessonId) => {
  try {
    const response = await api.post(`/progress/complete`, {
      course_id: courseId,
      lesson_id: lessonId
    });
    return response.data;
  } catch (error) {
    console.error('Error marking lesson complete:', error);
    throw error;
  }
};

// Get user progress for a course
export const getUserProgress = async (courseId) => {
  try {
    const response = await api.get(`/progress/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching progress:', error);
    throw error;
  }
};
export default courseApi;