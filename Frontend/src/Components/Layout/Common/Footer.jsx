import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Paw Pals</h2>
                        <p className="text-sm">Connecting dogs with loving homes since 2010.</p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">Adopt a Dog</a></li>
                            <li><a href="#" className="hover:underline">Donate</a></li>
                            <li><a href="#" className="hover:underline">Volunteer</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Dog Care Tips</a></li>
                            <li><a href="#" className="hover:underline">Training Guides</a></li>
                            <li><a href="#" className="hover:underline">Health & Nutrition</a></li>
                            <li><a href="#" className="hover:underline">Breed Information</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic">
                            <p>123 Bark Avenue</p>
                            <p>Dogtown, CA 90210</p>
                            <p>Phone: (555) 123-4567</p>
                            <p>Email: woof@pawpals.com</p>
                        </address>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm">
                    <p>&copy; 2024 Paw Pals. All rights reserved.</p>
                    <p className="mt-2">
                        <a href="#" className="hover:underline">Privacy Policy</a> |
                        <a href="#" className="hover:underline ml-2">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}