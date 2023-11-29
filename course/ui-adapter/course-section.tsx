import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function CourseSection() {
  return (
    <Link href="#">
      <h2 className="font-semibold text-white pb-1 pt-2 mt-2">Section title</h2>
      <Divider className="bg-gray-600 my-4" />
      <div className="text-sm text-gray-600 flex items-center">
        <video
          src="http://placehold.it/360x150"
          style={{
            height: "170px",
            paddingTop: "15px",
            width: "200px",
          }}
        />
        <div className="text-gray-900 font-bold text-l mb-2 ml-2 p-1">
          <div className="flex items-center gap-4 pt-2">
            <div className="font-small text-gray-500">
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Snowflake
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
