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
import { sleep } from "./common-util";
import { hmrOnce } from "./decorators";

function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class GlobalUtil {
  @hmrOnce
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
  // -- react --
  // NOTE: to avoid name conflict, use dynamic import instead of static import
  type FC<P = {}> = import("react").FC<P>;
  const useEffect: typeof import("react").useEffect;
  const useState: typeof import("react").useState;
  const useCallback: typeof import("react").useCallback;
  const useMemo: typeof import("react").useMemo;
  const useRef: typeof import("react").useRef;

  // -- common --
  const sleep: typeof import("./common-util").sleep;
  type AnyFunction = (...args: any) => any;

  // -- antd --
  const Button: typeof import("antd").Button;
  const Space: typeof import("antd").Space;
  const Flex: typeof import("antd").Flex;
  const Tooltip: typeof import("antd").Tooltip;
  const Modal: typeof import("antd").Modal;
  const Cascader: typeof import("antd").Cascader;
  const Select: typeof import("antd").Select;
  const Card: typeof import("antd").Card;
  const message: typeof import("antd").message;
  const Spin: typeof import("antd").Spin;
  const Popconfirm: typeof import("antd").Popconfirm;
  const Popover: typeof import("antd").Popover;
  const Typography: typeof import("antd").Typography;
}

export const globalUtil = new GlobalUtil();
