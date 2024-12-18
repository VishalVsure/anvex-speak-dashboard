import { Button } from "@/components/ui/button";

export default function KnowledgeBase() {
  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            knowledge-base
          </h1>
          <p className="text-gray-500">Manage your AI telecalling system</p>
        </div>
        <Button className="bg-[#6366F1] hover:bg-[#5558DD]">
          New Campaign
        </Button>
      </div>

      <div className="space-y-8">
        {/* Knowledge Sources Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Knowledge Sources
          </h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Document Library
                </h3>
                <p className="text-gray-500">
                  Upload and manage training documents
                </p>
              </div>
              <Button className="bg-[#6366F1] hover:bg-[#5558DD]">
                Upload Document
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Product Manual v2.1</h4>
                  <p className="text-sm text-gray-500">PDF • 2.3 MB</p>
                </div>
                <Button
                  variant="link"
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sales Scripts</h4>
                  <p className="text-sm text-gray-500">DOCX • 321 KB</p>
                </div>
                <Button
                  variant="link"
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* API Integrations Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            API Integrations
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">CRM Integration</h3>
                <p className="text-sm text-gray-500">Connected to Salesforce</p>
              </div>
              <Button variant="outline" className="text-gray-700">
                Configure
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Knowledge Base API</h3>
                <p className="text-sm text-gray-500">Connected to Zendesk</p>
              </div>
              <Button variant="outline" className="text-gray-700">
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
