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

export default courseApi;