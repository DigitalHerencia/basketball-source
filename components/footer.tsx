import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-muted-foreground">
              Basketball Stats Hub is a personal project by Silas Roman, a 16-year-old basketball fanatic from Anthony,
              NM who attends Gadsden High School and plays trombone in the band.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/players" className="text-sm hover:text-primary">
                  Players
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-sm hover:text-primary">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/seasons" className="text-sm hover:text-primary">
                  Seasons
                </Link>
              </li>
              <li>
                <Link href="/leaders" className="text-sm hover:text-primary">
                  Leaders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-primary">
                  About the Site
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Gadsden High School</h3>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              <span className="text-sm">Gadsden Panthers</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Home of the Panthers
              <br />
              Anthony, New Mexico
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Basketball Stats Hub by Silas Roman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

