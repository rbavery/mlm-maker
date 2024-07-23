import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Form from "@rjsf/core";
import Head from "next/head";
import RefParser from "json-schema-ref-parser";
import Ajv from "ajv";

const inter = Inter({ subsets: ["latin"] });
const ajv = new Ajv();

export default function Home() {
  const [schema, setSchema] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const schemaUrl = "https://crim-ca.github.io/mlm-extension/v1.2.0/schema.json";
        const schemaData = await RefParser.dereference(schemaUrl);
        setSchema(schemaData);
      } catch (error) {
        console.error("Error fetching schema:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossOrigin="anonymous"
        />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {loading ? (
          <p>Loading schema...</p>
        ) : schema ? (
          <Form schema={schema} validator={ajv}>
            <div />
          </Form>
        ) : (
          <p>Error loading schema.</p>
        )}
      </main>
    </>
  );
}

