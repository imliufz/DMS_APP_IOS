//
//  DMSABController.h
//  HBuilder-Hello
//
//  Created by lorrykiko on 16/10/24.
//  Copyright © 2016年 DCloud. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AddressBook/AddressBook.h>
#import <AddressBookUI/AddressBookUI.h>

@interface DMSABController : NSObject <ABPeoplePickerNavigationControllerDelegate>
@property (strong, nonatomic) UIWebView *webView;

-(void)showAddressBook;
@end
