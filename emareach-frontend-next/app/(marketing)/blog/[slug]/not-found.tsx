import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-background pt-10 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-2xl font-semibold mb-2">Post not found</h1>
        <p className="text-muted-foreground mb-8">This post may have been removed or the link is incorrect.</p>
        <Link href="/blog">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Button>
        </Link>
      </div>
    </div>
  );
}
