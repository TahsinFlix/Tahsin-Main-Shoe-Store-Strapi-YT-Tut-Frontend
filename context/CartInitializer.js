"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCartFromLocalStorage } from "@/store/cartSlice";

export default function CartInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage when the component mounts
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  return null;
}
