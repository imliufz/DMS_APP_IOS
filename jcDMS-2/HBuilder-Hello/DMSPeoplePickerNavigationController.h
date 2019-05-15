//
//  DMSPeoplePickerNavigationController.h
//  HBuilder-Hello
//
//  Created by lorrykiko on 16/9/9.
//  Copyright © 2016年 DCloud. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <ContactsUI/ContactsUI.h>



@interface DMSPeoplePickerNavigationController : NSObject  <CNContactPickerDelegate>
@property (strong, nonatomic) UIWebView *webView;
@end


