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
    x0?: string;
    x1?: string;
    error: number;
  }) => {
    const bisectionMethod = new BisectionMethod(values.fx, values.error);

    try {
      const result =
        values.x0 && values.x1
          ? bisectionMethod.findRoots(
              parseFloat(values.x0),
              parseFloat(values.x1),
            )
          : bisectionMethod.findRoots(10);

      setBisectionMethodResult({
        x0: result.x0,
        x1: result.x1,
        root: result.root,
        error: result.error,
      });

      return result;
    } catch (err) {
      if (err instanceof Error) message.error(err.message);
    }
  };

  return (
    <main className="bg-white sm:p-10 p-6">
      <div className="flex flex-col gap-4">
        <p className="text-lg">
          Bracketing Method (Bisection, False Position (Regula Falsi))
        </p>

        <Form
          className="grid sm:grid-cols-2 grid-cols-1 gap-x-10"
          form={form}
          layout="vertical"
          onFinish={calculateBisection}
        >
          <Form.Item
            label="Enter equation"
            name="fx"
            rules={[{ required: true, message: "Equation is required" }]}
          >
            <Input placeholder="Eg: 3x + sin(x) - e^x" size="large" />
          </Form.Item>

          <Form.Item
            label="Precision:"
            name="error"
            rules={[{ required: true, message: "Precision is required" }]}
          >
            <Input type="number" placeholder="Enter precision" size="large" />
          </Form.Item>

          <Form.Item
            label="First guess:"
            name="x0"
            rules={[{ required: true, message: "Initial guess is required" }]}
          >
            <Input type="number" placeholder="Enter first guess" size="large" />
          </Form.Item>

          <Form.Item
            label="Second guess:"
            name="x1"
            rules={[{ required: true, message: "Initial guess is required" }]}
          >
            <Input
              type="number"
              placeholder="Enter second guess"
              size="large"
            />
          </Form.Item>

          <div className="flex gap-6">
            <Form.Item className="sm:flex-none flex-1">
              <Button
                className="bg-[#1677ff] sm:w-auto w-full"
                size="large"
                htmlType="submit"
                type="primary"
              >
                Calculate
              </Button>
            </Form.Item>

            <Form.Item className="flex-1 sm:flex-none">
              <Button
                className="sm:w-auto w-full"
                size="large"
                onClick={() => {
                  form.validateFields(["fx", "error"]).then((values) => {
                    const result = calculateBisection(values);

                    form.setFieldsValue(result);
                  });
                }}
              >
                Randomise Guessing
              </Button>
            </Form.Item>
          </div>

          <Form.Item className="col-span-full">
            <div className="flex gap-10 flex-wrap text-lg">
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
