import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CancelConfirmNavigation() {
  const router = useRouter();
  const [isNavigatingAway, setIsNavigatingAway] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isNavigatingAway) {
        e.preventDefault();
        e.returnValue = ''; // This shows a default confirmation dialog in some browsers
      }
    };

    const handleRouteChange = (url) => {
      if (!isNavigatingAway) {
        const confirmLeave = window.confirm(
          "Are you sure you want to leave this page? Your order process will be canceled."
        );
        if (!confirmLeave) {
          router.push("/place-order"); // Stay on the current page
        } else {
          setIsNavigatingAway(true);
          router.push("/failed"); // Go to the failed page
        }
      }
    };

    const handleManualNavigation = () => {
      handleRouteChange(router.asPath);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleManualNavigation);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleManualNavigation);
    };
  }, [router, isNavigatingAway]);

  return null; // No UI, just handling events
}
