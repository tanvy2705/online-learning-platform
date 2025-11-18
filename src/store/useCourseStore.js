import { create } from 'zustand';
import courseApi from '../api/courseApi';

const useCourseStore = create((set, get) => ({
  courses: [],
  categories: [],
  currentCourse: null,
  isLoading: false,
  totalPages: 1,

  fetchCourses: async (params = {}) => {
    set({ isLoading: true });
    try {
      const response = await courseApi.getAllCourses(params);
      set({ 
        courses: response.data, 
        totalPages: response.pagination?.total_pages || 1,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Fetch courses error:', error);
    }
  },

  fetchCourseById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await courseApi.getCourseById(id);
      set({ currentCourse: response.data, isLoading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: 'Không tìm thấy khóa học' };
    }
  },

  fetchCategories: async () => {
    try {
      const response = await courseApi.getCategories();
      set({ categories: response.data });
    } catch (error) {
      console.error('Fetch categories error:', error);
    }
  },

  createCourse: async (courseData) => {
    try {
      await courseApi.createCourse(courseData);
      await get().fetchCourses();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Tạo khóa học thất bại' };
    }
  },

  updateCourse: async (id, courseData) => {
    try {
      await courseApi.updateCourse(id, courseData);
      await get().fetchCourses();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Cập nhật khóa học thất bại' };
    }
  },

  deleteCourse: async (id) => {
    try {
      await courseApi.deleteCourse(id);
      await get().fetchCourses();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Xóa khóa học thất bại' };
    }
  },
}));

export default useCourseStore;