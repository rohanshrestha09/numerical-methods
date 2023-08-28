"use client";

import { BisectionMethod } from "@/lib/bisection";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";

export default function Home() {
  const [form] = Form.useForm();

  const [bisectionMethodResult, setBisectionMethodResult] = useState({
    x0: 0,
    x1: 0,
    root: 0,
    error: 0,
  });

  const calculateBisection = (values: {
    fx: string;
    x0: string;
    x1: string;
    error: number;
  }) => {
    const bisectionMethod = new BisectionMethod(values.fx, values.error);

    try {
      const result = bisectionMethod.findRoots(
        parseFloat(values.x0),
        parseFloat(values.x1),
      );

      setBisectionMethodResult({
        x0: parseFloat(values.x0),
        x1: parseFloat(values.x1),
        root: result.root,
        error: result.error,
      });
    } catch (err) {
      if (err instanceof Error) message.error(err.message);
    }
  };

  return (
    <main className="bg-white p-10">
      <div className="flex flex-col gap-4">
        <p className="text-lg">
          Bracketing Method (Bisection, False Position (Regula Falsi))
        </p>

        <Form
          className="grid grid-cols-2 gap-x-10"
          form={form}
          layout="vertical"
          onFinish={calculateBisection}
        >
          <Form.Item label="Enter equation" name="fx">
            <Input placeholder="Eg: 3x + sin(x) - e^x" size="large" />
          </Form.Item>

          <Form.Item label="Precision:" name="error">
            <Input type="number" placeholder="Enter precision" size="large" />
          </Form.Item>

          <Form.Item label="First guess:" name="x0">
            <Input type="number" placeholder="Enter first guess" size="large" />
          </Form.Item>

          <Form.Item label="Second guess:" name="x1">
            <Input
              type="number"
              placeholder="Enter second guess"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-[#1677ff]"
              size="large"
              htmlType="submit"
              type="primary"
            >
              Calculate
            </Button>
          </Form.Item>

          <Form.Item className="col-span-full">
            <div className="flex gap-10 text-lg">
              <p>x0: {bisectionMethodResult.x0}</p>
              <p>x1: {bisectionMethodResult.x1}</p>
              <p>Root: {bisectionMethodResult.root}</p>
              <p>Error: {bisectionMethodResult.error}</p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
