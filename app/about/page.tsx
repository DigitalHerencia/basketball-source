import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">About Basketball Stats Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>The Project</CardTitle>
              <CardDescription>A personal project by Silas Roman</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Basketball Stats Hub is a comprehensive basketball statistics database created by Silas Roman, a
                16-year-old basketball enthusiast from Anthony, New Mexico. As a student at Gadsden High School and a
                trombone player in the school band, Silas combined his passion for basketball and web development to
                create this resource for fellow basketball fans.
              </p>
              <p>
                This platform provides detailed statistics, scores, and historical data for the NBA, ABA, WNBA, and top
                European basketball competitions. The data is automatically scraped and updated regularly to ensure the
                most current information is always available.
              </p>
              <p>
                Built with Next.js 15, React 19, and styled with Tailwind CSS and shadcn/ui components, Basketball Stats
                Hub represents both a technical achievement and a labor of love for the game.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>About Silas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square relative rounded-md overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=300" alt="Silas Roman" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold">Silas Roman</h3>
                <p className="text-sm text-muted-foreground">Basketball Fanatic & Web Developer</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Age:</span>
                  <span>16</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">School:</span>
                  <span>Gadsden High School</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Location:</span>
                  <span>Anthony, New Mexico</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Interests:</span>
                  <span>Basketball, Web Development, Trombone</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Technical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Basketball Stats Hub is built with modern web technologies to provide a fast, responsive, and
              user-friendly experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Next.js 15 for server-side rendering and routing</li>
              <li>React 19 for interactive UI components</li>
              <li>Tailwind CSS for styling</li>
              <li>shadcn/ui for beautiful, accessible UI components</li>
              <li>Automated data scraping for up-to-date statistics</li>
              <li>Responsive design for all devices</li>
              <li>Dark mode support</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gadsden High School</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">GHS</span>
              </div>
              <div>
                <h3 className="font-semibold">Gadsden High School</h3>
                <p className="text-sm text-muted-foreground">Home of the Panthers</p>
              </div>
            </div>
            <p>
              Gadsden High School is located in Anthony, New Mexico. The school's colors are maroon and the mascot is
              the Black Panther. The school has a proud tradition of academic excellence and athletic achievement.
            </p>
            <p>Silas is a proud member of the Gadsden High School band, where he plays the trombone.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

