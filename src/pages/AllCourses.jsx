import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../services/operations/";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const result = await getAllCourses();
        setCourses(result || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white text-xl">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white text-xl">No courses found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">All Courses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course._id || index}
              className="bg-richblack-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-richblack-900 px-2 py-1 rounded text-sm font-semibold">
                  ₹{course.price}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {course.courseName}
                </h3>
                
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 mr-2">⭐</span>
                  <span className="text-richblack-300 text-sm">
                    {course.ratingAndReviews?.length || 0} reviews
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-richblack-300 text-sm">
                    {course.studentsEnrolled?.length || 0} students
                  </span>
                  <span className="text-richblack-300 text-sm">
                    By {course.instructor?.firstName} {course.instructor?.lastName}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleViewDetails(course._id)}
                  className="w-full mt-4 bg-yellow-400 text-richblack-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
