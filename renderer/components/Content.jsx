import { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { RxDotFilled, RxCheck, RxChevronRight } from "react-icons/rx";

export default ({ children }) => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState("pedro");

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="w-[77vw] overflow-y-auto px-2 h-[89vh]">{children}</div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="ContextMenuContent"
          sideOffset={5}
          align="end"
        >
          <ContextMenu.Item className="ContextMenuItem">
            Back <div className="RightSlot">⌘+[</div>
          </ContextMenu.Item>
          <ContextMenu.Item className="ContextMenuItem" disabled>
            Foward <div className="RightSlot">⌘+]</div>
          </ContextMenu.Item>
          <ContextMenu.Item className="ContextMenuItem">
            Reload <div className="RightSlot">⌘+R</div>
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
              More Tools
              <div className="RightSlot">
                <RxChevronRight />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="ContextMenuSubContent"
                sideOffset={2}
                alignOffset={-5}
              >
                <ContextMenu.Item className="ContextMenuItem">
                  Save Page As… <div className="RightSlot">⌘+S</div>
                </ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem">
                  Create Shortcut…
                </ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem">
                  Name Window…
                </ContextMenu.Item>
                <ContextMenu.Separator className="ContextMenuSeparator" />
                <ContextMenu.Item className="ContextMenuItem">
                  Developer Tools
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenu.Separator className="ContextMenuSeparator" />

          <ContextMenu.CheckboxItem
            className="ContextMenuCheckboxItem"
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
              <RxCheck />
            </ContextMenu.ItemIndicator>
            Show Bookmarks <div className="RightSlot">⌘+B</div>
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem
            className="ContextMenuCheckboxItem"
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
              <RxCheck />
            </ContextMenu.ItemIndicator>
            Show Full URLs
          </ContextMenu.CheckboxItem>

          <ContextMenu.Separator className="ContextMenuSeparator" />

          <ContextMenu.Label className="ContextMenuLabel">
            People
          </ContextMenu.Label>
          <ContextMenu.RadioGroup value={person} onValueChange={setPerson}>
            <ContextMenu.RadioItem
              className="ContextMenuRadioItem"
              value="pedro"
            >
              <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                <RxDotFilled />
              </ContextMenu.ItemIndicator>
              Pedro Duarte
            </ContextMenu.RadioItem>
            <ContextMenu.RadioItem
              className="ContextMenuRadioItem"
              value="colm"
            >
              <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                <RxDotFilled />
              </ContextMenu.ItemIndicator>
              Colm Tuite
            </ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
