import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from "../components/common/Footer"
import CourseCard from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import { matchCategoryFromURL } from "../Util/categoryUtils"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [error, setError] = useState(null)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  useEffect(() => {
     (async () => {
      try {
        setIsLoadingCategories(true);
        setError(null);
        
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        console.log("Categories API response:", res?.data);
        
        if (!res?.data?.success || !res?.data?.data) {
          console.log("Invalid categories response structure:", res?.data);
          setError("Failed to load categories");
          setIsLoadingCategories(false);
          return;
        }
        
        const categoriesData = res.data.data;
        
        if (categoriesData.length === 0) {
          console.log("No categories found in database");
          setError("No categories available");
          setIsLoadingCategories(false);
          return;
        }
        
        console.log(`Looking for category matching "${catalogName}"`);
        console.log("Available categories:", categoriesData.map(cat => cat.name));
        
        // Use the utility function to match category
        const matchedCategory = matchCategoryFromURL(catalogName, categoriesData);
        
        if (!matchedCategory) {
          console.log(`No category found matching "${catalogName}"`);
          console.log("URL formats expected:");
          categoriesData.forEach(cat => {
            console.log(`- ${cat.name} → /catalog/${cat.name.toLowerCase().replace(/\s+/g, '-')}`);
          });
          setError(`Category "${catalogName}" not found`);
          setIsLoadingCategories(false);
          return;
        }
        
        console.log(`Matched category: ${matchedCategory.name}`);
        
        const category_id = matchedCategory._id;
        setCategoryId(category_id);
        setIsLoadingCategories(false);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
        setError("Failed to fetch categories");
        setIsLoadingCategories(false);
      }
    })()
  }, [catalogName])
  useEffect(() => {
    if (categoryId) {
      ; (async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (isLoadingCategories || loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-richblack-5 mb-4">Error</h2>
          <p className="text-richblack-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-400 text-richblack-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!categoryId) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-richblack-5 mb-4">Category Not Found</h2>
          <p className="text-richblack-300 mb-6">The category "{catalogName}" could not be found.</p>
          <a 
            href="/courses" 
            className="bg-yellow-400 text-richblack-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            View All Courses
          </a>
        </div>
      </div>
    )
  }

  if (!catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${active === 1
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
              } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${active === 2
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
              } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
