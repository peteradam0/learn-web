"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [isMyCoursesActive, setIsMyCoursesActive] = useState(false);
  const [isAnalyticsActive, setIsAnalyticsActive] = useState(false);

  useEffect(() => {
    setIsHomeActive(false);
    setIsDashboardActive(false);
    setIsMyCoursesActive(false);
    setIsAnalyticsActive(false);

    switch (pathname) {
      case "/":
        setIsHomeActive(true);
        break;
      case "/dashboard":
        setIsDashboardActive(true);
        break;
      case "/administration/courses":
        setIsMyCoursesActive(true);
        break;
      case "/administration/analytics":
        setIsAnalyticsActive(true);
        break;
      default:
        break;
    }
  }, [pathname]);

  return {
    isHomeActive,
    isDashboardActive,
    isMyCoursesActive,
    isAnalyticsActive,
  };
};

export default useNavigation;
