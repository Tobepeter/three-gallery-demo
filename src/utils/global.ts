import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  Button,
  Space,
  Tooltip,
  Modal,
  Cascader,
  Select,
  Card,
  message,
  Spin,
  Popconfirm,
  Popover,
  Typography,
  Flex,
} from "antd";
import { sleep } from "./common";

class Global {
  init() {
    const map = {
      // -- react --
      useEffect,
      useState,
      useCallback,
      useMemo,
      useRef,

      // -- common --
      sleep,

      // -- antd --
      Button,
      Space,
      Flex,
      Tooltip,
      Modal,
      Cascader,
      Select,
      Card,
      message,
      Spin,
      Popconfirm,
      Popover,
      Typography,
    };

    const CHECK = import.meta.env.DEV;
    const global = window as any;
    for (const key in map) {
      if (CHECK && global[key] !== undefined) {
        console.error(`global.${key} already exists`);
      }
      global[key] = map[key as keyof typeof map];
    }
  }
}

declare global {
  // NOTE: to avoid name conflict, use dynamic import instead of static import
  type FC = import("react").FC;

  type AnyFunction = (...args: any) => any;
}

export const global = new Global();
