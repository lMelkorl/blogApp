import { useState } from "react";
import { useEffect } from "react";
import "./TopButton.css";

export default function TopButton() {
    const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 150) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && 
           <button
           type="button"
           class="btn btn-danger btn-floating btn-md"
           id="btn-back-to-top"
           onClick={scrollToTop}
         >
           <i class="fas fa-arrow-up"></i>
         </button>}
    </div>
    )
}