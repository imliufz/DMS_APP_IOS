//
//  DMSPeoplePickerNavigationController.m
//  HBuilder-Hello
//
//  Created by lorrykiko on 16/9/9.
//  Copyright © 2016年 DCloud. All rights reserved.
//

#import "DMSPeoplePickerNavigationController.h"
#import "DMSABController.h"
#import "AppDelegate.h"
#import "JPUSHService.h"


@implementation DMSPeoplePickerNavigationController



-(void)contactPicker:(CNContactPickerViewController *)picker didSelectContact:(CNContact *)contact{
    CNLabeledValue * labValue = [contact.phoneNumbers firstObject];
    [_webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"returnAddressBook('%@','%@');",[NSString stringWithFormat:@"%@%@", contact.familyName, contact.givenName],[labValue.value stringValue ]]];
}

-(void)showAddressBook{
    [self setWebView];
    NSString *sysVersion = [[UIDevice currentDevice] systemVersion];
    if ( [sysVersion floatValue] >= 9.0 ) {
        CNContactPickerViewController * contactVc = [CNContactPickerViewController new];
        contactVc.delegate = self;
        UIViewController *rootViewController = [[[UIApplication sharedApplication].delegate window] rootViewController];
        [rootViewController presentViewController:contactVc animated:YES completion:nil];
    } else {
        DMSABController *abc = [DMSABController new];
        abc.webView = _webView;
        [abc showAddressBook];
    }
}
-(void)setFocus{
    [self setWebView];
    self.webView.keyboardDisplayRequiresUserAction = NO;
}
- (void)setWebView
{
    UIViewController *appRootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
    UIViewController *topVC = appRootVC;
    while (topVC.presentedViewController) {
        topVC = topVC.presentedViewController;
    }
    UIWebView *webView =  topVC.view.subviews[3].subviews[0].subviews[0].subviews[0].subviews.lastObject.subviews[0];
    self.webView = webView;
}

-(void)refreshWebView{
    [self setWebView];
    [self.webView reload];
}
-(void)getPhoneTime{
    [self setWebView];
    AppDelegate *myDelegate = [[UIApplication sharedApplication] delegate];
    NSString *telTime =  myDelegate.telTime;
    [_webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"getPhoneTime('%@');",telTime]];
}
-(void)getRegistrationID{
    [self setWebView];
    //[JPUSHService init];
    [JPUSHService registrationIDCompletionHandler:^(int resCode, NSString *registrationID) {
        NSLog(@"resCode : %d,registrationID: %@",resCode,registrationID);
        [_webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"returnRegistrationID('%@');",registrationID]];
    }];
}
@end
