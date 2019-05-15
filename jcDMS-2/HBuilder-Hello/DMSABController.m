//
//  DMSABController.m
//  HBuilder-Hello
//
//  Created by lorrykiko on 16/10/24.
//  Copyright © 2016年 DCloud. All rights reserved.
//

#import "DMSABController.h"

@implementation DMSABController

- (void)peoplePickerNavigationController:(ABPeoplePickerNavigationController*)peoplePicker didSelectPerson:(ABRecordRef)person NS_AVAILABLE_IOS(8_0){
    
    NSString *firstName = (__bridge NSString *)ABRecordCopyValue(person, kABPersonFirstNameProperty);
    if (firstName==nil) {
        firstName = @" ";
    }
    NSString *lastName=(__bridge NSString *)ABRecordCopyValue(person, kABPersonLastNameProperty);
    if (lastName==nil) {
        lastName = @" ";
    }
    
    ABMutableMultiValueRef phoneMulti = ABRecordCopyValue(person, kABPersonPhoneProperty);
    NSMutableArray *phones = [NSMutableArray arrayWithCapacity:0];
    for (int i = 0; i < ABMultiValueGetCount(phoneMulti); i++) {
        NSString *aPhone = (__bridge NSString *)ABMultiValueCopyValueAtIndex(phoneMulti, i);
        [phones addObject:aPhone];
    }
    NSString *phone = @"";
    if (phones.count > 0) {
        phone = [phones objectAtIndex:0];
    }
    [peoplePicker dismissViewControllerAnimated:YES completion:^{
        [_webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"returnAddressBook('%@','%@');",[NSString stringWithFormat:@"%@%@", firstName, lastName],phone ]];
    }];
}

-(void)showAddressBook{
    ABPeoplePickerNavigationController * vc = [[ABPeoplePickerNavigationController alloc] init];
    vc.peoplePickerDelegate = self;
    UIViewController *rootViewController = [[[UIApplication sharedApplication].delegate window] rootViewController];
    [rootViewController presentViewController:vc animated:YES completion:nil];
}

@end
