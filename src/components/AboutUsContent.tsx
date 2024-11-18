import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

export default function AboutUsContent() {
  return (
    <div className="max-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">
            About Anvex Speak
          </h1>

          <div className="space-y-4 mb-6">
            <p className="text-lg text-muted-foreground">
              Anvex Speak is a leading provider of innovative call management
              solutions. We specialize in transforming how businesses handle
              their communications, offering intuitive tools that streamline
              operations and enhance customer experiences.
            </p>
            <p className="text-lg text-muted-foreground">
              With over a decade of experience in the industry, our team is
              committed to delivering reliable, cutting-edge technology that
              empowers businesses to connect better. We pride ourselves on our
              dedication to customer satisfaction and our 24/7 support services.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primary" />
              <span className="text-lg font-bold">
                Himanshu Vaidya : +91 9702455888
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primary" />
              <span className="text-lg font-bold">
                Siddhesh Kolwankar : +91 9029095047
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
